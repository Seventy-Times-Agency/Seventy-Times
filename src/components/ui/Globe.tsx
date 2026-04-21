"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Globe.module.css";

type GlobeProps = {
  size?: number;
  density?: number;
  showRings?: boolean;
  showArcs?: boolean;
  autoRotate?: boolean;
  interactive?: boolean;
  className?: string;
};

/**
 * Continent-shaped dot globe used by the PageIntro loader.
 *
 * Dots are Fibonacci-sampled across the sphere and filtered against
 * a crude lat/lon polygon set of the world's landmasses so the planet
 * reads as Earth rather than a generic ball. A custom shader culls
 * back-facing dots and pulses the green "city" nodes. Tilted torus
 * rings, subtle wireframe, ephemeral great-circle arcs between random
 * cities, and travelling "data packets" along each arc finish the
 * network / internet motif.
 *
 * Runs entirely client-side. Respects prefers-reduced-motion.
 */

// Crude world landmass polygons (lon/lat). Enough shape for a
// stylised dot globe; not meant to be geographically accurate.
const LAND_POLYGONS: Array<Array<[number, number]>> = [
  // North America
  [[-168,66],[-160,70],[-140,70],[-128,70],[-110,70],[-95,74],[-80,76],[-65,82],[-58,70],[-55,53],[-65,45],[-70,41],[-74,39],[-76,34],[-81,30],[-80,25],[-83,24],[-88,30],[-94,29],[-97,26],[-106,23],[-115,30],[-123,38],[-125,48],[-135,58],[-148,60],[-162,54],[-168,66]],
  // Greenland
  [[-55,60],[-40,60],[-22,72],[-20,82],[-45,83],[-60,75],[-55,60]],
  // South America
  [[-80,12],[-75,10],[-65,10],[-55,5],[-50,0],[-42,-8],[-35,-8],[-38,-18],[-45,-25],[-55,-35],[-65,-43],[-72,-53],[-72,-40],[-76,-30],[-80,-18],[-80,-5],[-80,12]],
  // Europe
  [[-10,36],[-5,43],[0,48],[3,52],[8,55],[12,58],[20,65],[28,70],[40,68],[55,68],[65,70],[75,68],[70,56],[55,52],[45,48],[40,45],[35,42],[27,40],[22,38],[15,38],[10,37],[-5,36],[-10,36]],
  // Africa
  [[-17,14],[-16,22],[-5,30],[10,32],[20,32],[30,32],[35,30],[40,22],[44,12],[51,12],[52,2],[42,-10],[38,-18],[32,-28],[25,-34],[18,-34],[14,-22],[9,-5],[-5,4],[-10,8],[-17,14]],
  // Arabia
  [[35,30],[50,25],[55,18],[55,12],[45,12],[38,15],[35,24],[35,30]],
  // Asia
  [[45,48],[55,52],[70,56],[80,60],[95,60],[110,62],[125,65],[140,68],[155,70],[168,65],[175,65],[170,60],[155,55],[140,52],[135,45],[135,35],[130,33],[122,30],[118,22],[108,20],[103,12],[96,18],[90,22],[88,25],[78,22],[72,20],[68,24],[60,28],[50,30],[45,38],[45,48]],
  // Indian subcontinent
  [[68,24],[72,20],[78,8],[82,8],[88,22],[85,26],[78,22],[72,20],[68,24]],
  // Southeast Asia
  [[95,8],[105,5],[110,0],[115,-3],[120,-5],[128,-5],[135,-3],[140,-5],[135,-8],[120,-10],[105,-8],[98,0],[95,8]],
  // Australia
  [[113,-22],[122,-18],[132,-12],[142,-10],[148,-18],[152,-25],[148,-37],[140,-38],[128,-32],[118,-35],[114,-32],[113,-22]],
  // New Zealand
  [[166,-46],[172,-41],[174,-38],[177,-40],[174,-46],[168,-47],[166,-46]],
  // Antarctica band
  [[-180,-70],[-120,-72],[-60,-74],[0,-72],[60,-70],[120,-72],[180,-70],[180,-85],[-180,-85],[-180,-70]],
  // UK
  [[-8,51],[-5,58],[-2,58],[0,54],[-3,51],[-8,51]],
  // Japan
  [[132,32],[138,36],[142,40],[145,43],[141,45],[135,38],[131,33],[132,32]],
  // Madagascar
  [[43,-12],[48,-15],[50,-24],[46,-25],[43,-20],[43,-12]],
];

function pointInPoly(lon: number, lat: number, poly: Array<[number, number]>) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const hit =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}

function isLand(lon: number, lat: number) {
  for (const p of LAND_POLYGONS) if (pointInPoly(lon, lat, p)) return true;
  return false;
}

const VERT_SHADER = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPulse;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 worldNormal = normalize((modelMatrix * vec4(position, 0.0)).xyz);
    vec3 toCam = normalize(cameraPosition - worldPos);
    float facing = dot(worldNormal, toCam);

    float isGreen = step(1.5, aPulse);
    float pulse = 0.5 + 0.5 * sin(uTime * 2.5 + aPulse);
    float pulseScale = mix(1.0, 0.7 + 0.8 * pulse, isGreen);

    vAlpha = smoothstep(-0.05, 0.2, facing);

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * pulseScale;
  }
`;

const FRAG_SHADER = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    if (vAlpha <= 0.001) discard;
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.25, d) * vAlpha;
    gl_FragColor = vec4(vColor, a);
  }
`;

export default function Globe({
  size = 320,
  density = 5,
  showRings = true,
  showArcs = true,
  autoRotate = true,
  interactive = false,
  className,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const CASPER = new THREE.Color("#c8d4de");
    const GREEN = new THREE.Color("#4ade80");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.0;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(size, size, false);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Tiny dark inner sphere so dots on the far side don't bleed through
    const coreGeo = new THREE.SphereGeometry(0.985, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0a0b10,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(core);

    // Sample Fibonacci-distributed points, keep only the ones that land on a continent
    const N = Math.round(4000 + density * 3000);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    const pulses: number[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(z, x) * 180) / Math.PI;
      if (!isLand(lon, lat)) continue;
      positions.push(x, y, z);
      const green = Math.random() < 0.014;
      const c = green ? GREEN : CASPER;
      colors.push(c.r, c.g, c.b);
      sizes.push(green ? 6.5 : 2.7);
      pulses.push(green ? 2 + Math.random() * 6.28 : Math.random() * 6.28);
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    dotGeo.setAttribute(
      "aColor",
      new THREE.Float32BufferAttribute(colors, 3),
    );
    dotGeo.setAttribute(
      "aSize",
      new THREE.Float32BufferAttribute(sizes, 1),
    );
    dotGeo.setAttribute(
      "aPulse",
      new THREE.Float32BufferAttribute(pulses, 1),
    );
    const dotMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
      },
      vertexShader: VERT_SHADER,
      fragmentShader: FRAG_SHADER,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotPoints);

    // Subtle wireframe grid — JARVIS-style 3D read
    const wireGeo = new THREE.SphereGeometry(0.995, 36, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: CASPER,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wire);

    // Tilted torus rings, each with a small satellite node
    type Ring = {
      group: THREE.Group;
      speed: number;
      geos: THREE.BufferGeometry[];
      mats: THREE.Material[];
    };
    const rings: Ring[] = [];
    if (showRings) {
      const defs = [
        { r: 1.22, t: 0.0028, tx: 0.4, tz: 0.15, op: 0.42 },
        { r: 1.4, t: 0.0022, tx: -0.5, tz: -0.25, op: 0.24 },
        { r: 1.6, t: 0.002, tx: 0.15, tz: 0.45, op: 0.14 },
      ];
      defs.forEach((d) => {
        const group = new THREE.Group();
        const torusGeo = new THREE.TorusGeometry(d.r, d.t, 2, 220);
        const torusMat = new THREE.MeshBasicMaterial({
          color: CASPER,
          transparent: true,
          opacity: d.op,
          depthWrite: false,
        });
        group.add(new THREE.Mesh(torusGeo, torusMat));

        const nodeGeo = new THREE.SphereGeometry(0.03, 12, 12);
        const nodeMat = new THREE.MeshBasicMaterial({ color: CASPER });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.x = d.r;
        group.add(node);

        group.rotation.x = d.tx;
        group.rotation.z = d.tz;
        scene.add(group);
        rings.push({
          group,
          speed: 0.25 + Math.random() * 0.35,
          geos: [torusGeo, nodeGeo],
          mats: [torusMat, nodeMat],
        });
      });
    }

    // Great-circle arcs between random land points, with a travelling
    // packet riding each one. A bit more than the designer's 10 and
    // with packet colour tinted to match a mostly-casper, sparsely-green mix.
    type Arc = {
      line: THREE.Line;
      geo: THREE.BufferGeometry;
      mat: THREE.LineBasicMaterial;
      curve: THREE.QuadraticBezierCurve3;
      duration: number;
      start: number;
    };
    const arcs: Arc[] = [];
    let packets: THREE.Points | null = null;
    let packetPositions: Float32Array | null = null;
    let packetGeo: THREE.BufferGeometry | null = null;
    let packetMat: THREE.PointsMaterial | null = null;

    if (showArcs && positions.length > 0) {
      const ARC_COUNT = 14;
      const landPts: THREE.Vector3[] = [];
      for (let i = 0; i < positions.length; i += 3) {
        landPts.push(
          new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]),
        );
      }

      const packetPos = new Float32Array(ARC_COUNT * 3);
      const packetColors = new Float32Array(ARC_COUNT * 3);
      packetGeo = new THREE.BufferGeometry();
      packetGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(packetPos, 3),
      );
      packetGeo.setAttribute(
        "color",
        new THREE.BufferAttribute(packetColors, 3),
      );
      packetMat = new THREE.PointsMaterial({
        size: 0.06,
        sizeAttenuation: false,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });

      let tries = 0;
      while (arcs.length < ARC_COUNT && tries < ARC_COUNT * 10) {
        tries++;
        const a = landPts[Math.floor(Math.random() * landPts.length)];
        const b = landPts[Math.floor(Math.random() * landPts.length)];
        const dist = a.distanceTo(b);
        if (dist < 0.6) continue;

        const mid = new THREE.Vector3()
          .addVectors(a, b)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(1 + dist * 0.35);
        const curve = new THREE.QuadraticBezierCurve3(
          a.clone().multiplyScalar(1.005),
          mid,
          b.clone().multiplyScalar(1.005),
        );
        const pts = curve.getPoints(48);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const isHotLink = Math.random() < 0.25;
        const mat = new THREE.LineBasicMaterial({
          color: isHotLink ? GREEN : CASPER,
          transparent: true,
          opacity: isHotLink ? 0.35 : 0.25,
          depthWrite: false,
        });
        const line = new THREE.Line(geo, mat);
        globeGroup.add(line);

        const c = isHotLink ? GREEN : CASPER;
        const idx = arcs.length * 3;
        packetColors[idx] = c.r;
        packetColors[idx + 1] = c.g;
        packetColors[idx + 2] = c.b;

        arcs.push({
          line,
          geo,
          mat,
          curve,
          duration: 1.4 + Math.random() * 1.8,
          start: Math.random() * 3,
        });
      }

      packets = new THREE.Points(packetGeo, packetMat);
      globeGroup.add(packets);
    }

    // Gentle tilt — reads as a planet, not a ball
    globeGroup.rotation.x = 0.15;

    container.dataset.ready = "true";

    const state = {
      running: true,
      rotY: 0,
      rotX: 0.15,
      autoRot: 0.22,
    };

    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      if (!state.running) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.05);
      dotMat.uniforms.uTime.value = t;

      if (autoRotate && !prefersReducedMotion) {
        state.rotY += state.autoRot * dt;
      }
      globeGroup.rotation.y = state.rotY;
      globeGroup.rotation.x = state.rotX;

      if (!prefersReducedMotion) {
        rings.forEach((ring) => {
          ring.group.rotation.y += ring.speed * dt;
        });
      }

      if (packets && packetPositions === null && packetGeo) {
        packetPositions = packetGeo.attributes.position.array as Float32Array;
      }
      if (packets && packetPositions && packetGeo && packetMat) {
        for (let i = 0; i < arcs.length; i++) {
          const a = arcs[i];
          const raw = (t - a.start) / a.duration;
          const u = ((raw % 1) + 1) % 1;
          const p = a.curve.getPoint(u);
          packetPositions[i * 3] = p.x;
          packetPositions[i * 3 + 1] = p.y;
          packetPositions[i * 3 + 2] = p.z;
          // Arcs themselves breathe — fade in/hold/fade out across each cycle
          const fade =
            u < 0.15
              ? u / 0.15
              : u > 0.85
                ? (1 - u) / 0.15
                : 1;
          a.mat.opacity = (a.mat.color.equals(GREEN) ? 0.55 : 0.35) * fade;
        }
        packetGeo.attributes.position.needsUpdate = true;
        // Packet size breathes slightly — feels alive rather than static
        packetMat.size = 0.055 + Math.sin(t * 3) * 0.012;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (prefersReducedMotion) {
      dotMat.uniforms.uTime.value = 0;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      state.running = false;
      cancelAnimationFrame(raf);
      arcs.forEach((a) => {
        a.geo.dispose();
        a.mat.dispose();
      });
      rings.forEach((r) => {
        r.geos.forEach((g) => g.dispose());
        r.mats.forEach((m) => m.dispose());
      });
      packetGeo?.dispose();
      packetMat?.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, density, showRings, showArcs, autoRotate, interactive]);

  return (
    <div
      ref={containerRef}
      className={`${styles.stage} ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className={styles.glow} />
    </div>
  );
}
