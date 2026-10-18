#!/usr/bin/env python3
"""Generate a hyperframes-compatible transcript.json from the narration script
and ffmpeg silence-detect output. Distributes script words proportionally
across detected speech segments.

Word boundaries are heuristic, not whisper-accurate — but stable enough for
caption sync within ~150ms per word."""
import json
import re
import subprocess
import sys
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent
SCRIPT = PROJECT / "narration-script.txt"
AUDIO = PROJECT / "narration.wav"
OUT = PROJECT / "transcript.json"

# 1. Pull words from the script.
text = SCRIPT.read_text(encoding="utf-8")
# Treat letter-by-letter spellings (H T M L) as separate word tokens — TTS reads them as such.
raw_words = re.findall(r"[A-Za-z0-9']+", text)
if not raw_words:
    sys.exit("no words found in script")

# 2. Get audio duration.
dur_out = subprocess.check_output(
    ["ffprobe", "-v", "error", "-show_entries", "format=duration",
     "-of", "default=noprint_wrappers=1:nokey=1", str(AUDIO)]
).decode().strip()
audio_dur = float(dur_out)

# 3. Detect silences (-30dB, min 0.15s).
detect = subprocess.run(
    ["ffmpeg", "-hide_banner", "-i", str(AUDIO),
     "-af", "silencedetect=noise=-30dB:d=0.12", "-f", "null", "-"],
    capture_output=True
).stderr.decode()
starts = [float(m) for m in re.findall(r"silence_start:\s*([0-9.]+)", detect)]
ends = [float(m) for m in re.findall(r"silence_end:\s*([0-9.]+)", detect)]

# 4. Build speech segments — gaps between silences.
segments = []
cursor = 0.0
for s, e in zip(starts, ends):
    if s > cursor + 0.05:
        segments.append((cursor, s))
    cursor = e
if cursor < audio_dur - 0.05:
    segments.append((cursor, audio_dur))

# Filter segments shorter than 0.1s (artifacts).
segments = [(s, e) for s, e in segments if e - s >= 0.1]

# 5. Distribute words across segments proportionally to segment duration.
# Assign each word to a segment such that words/segment is proportional to
# segment_duration / total_speech_duration.
total_speech = sum(e - s for s, e in segments)
N = len(raw_words)

words_per_segment = []
remaining = N
for i, (s, e) in enumerate(segments):
    if i == len(segments) - 1:
        words_per_segment.append(remaining)
    else:
        share = round(N * (e - s) / total_speech)
        share = max(1, min(share, remaining - (len(segments) - 1 - i)))
        words_per_segment.append(share)
        remaining -= share

# 6. Inside each segment, space words uniformly.
words = []
wi = 0
for (s, e), count in zip(segments, words_per_segment):
    if count <= 0:
        continue
    seg_dur = e - s
    per_word = seg_dur / count
    for k in range(count):
        w = raw_words[wi]
        wi += 1
        ws = s + k * per_word
        we = ws + per_word * 0.92  # 8% tail gap inside segment
        words.append({
            "id": f"w{len(words)}",
            "text": w,
            "start": round(ws, 3),
            "end": round(we, 3),
        })

OUT.write_text(json.dumps(words, indent=2), encoding="utf-8")
print(f"wrote {len(words)} words to {OUT.relative_to(PROJECT)} — audio {audio_dur:.2f}s, {len(segments)} segments")
