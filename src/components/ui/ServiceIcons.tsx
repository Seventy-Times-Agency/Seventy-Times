/**
 * Line-art SVG icons for the three service cards. Designed as a set —
 * same 48×48 viewBox, same 1.5px stroke weight, same Casper accent
 * color via currentColor. Drop-in replacement for the old emoji.
 */

type IconProps = {
  className?: string;
};

export function TargetingIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" />
      <circle cx="24" cy="24" r="13" />
      <circle cx="24" cy="24" r="6" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />
      <line x1="24" y1="0" x2="24" y2="4" />
      <line x1="24" y1="44" x2="24" y2="48" />
      <line x1="0" y1="24" x2="4" y2="24" />
      <line x1="44" y1="24" x2="48" y2="24" />
    </svg>
  );
}

export function AutomationIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Three nodes forming a triangle */}
      <line x1="12" y1="14" x2="36" y2="14" />
      <line x1="12" y1="14" x2="24" y2="36" />
      <line x1="36" y1="14" x2="24" y2="36" />
      <circle cx="12" cy="14" r="4.5" fill="var(--black)" />
      <circle cx="36" cy="14" r="4.5" fill="var(--black)" />
      <circle cx="24" cy="36" r="4.5" fill="var(--black)" />
      {/* Inner dots inside each node */}
      <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="36" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="24" cy="36" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function AiIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      {/* Primary 4-pointed sparkle */}
      <path
        d="M24 3 L27.5 20.5 L45 24 L27.5 27.5 L24 45 L20.5 27.5 L3 24 L20.5 20.5 Z"
        fill="currentColor"
      />
      {/* Small secondary sparkle */}
      <path
        d="M38 6 L38.8 10.2 L43 11 L38.8 11.8 L38 16 L37.2 11.8 L33 11 L37.2 10.2 Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export const SERVICE_ICONS: Record<string, (props: IconProps) => JSX.Element> = {
  targeting: TargetingIcon,
  automation: AutomationIcon,
  aibot: AiIcon,
};
