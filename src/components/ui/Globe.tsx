"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Globe.module.css";

type GlobeProps = {
  size?: number;
  density?: number;
  showRings?: boolean;
  showArcs?: boolean;
  showNodes?: boolean;
  autoRotate?: boolean;
  className?: string;
};

/**
 * Self-contained three.js globe used by the PageIntro loader.
 *
 * Renders a wireframe sphere with a Fibonacci-distributed dot pattern,
 * tilted orbital rings with green "ping" satellites, and animated arc
 * beams between random surface nodes — the network / internet motif
 * the brief called for.
 *
 * Runs entirely client-side; no data fetched, no texture loaded.
 * Respects prefers-reduced-motion by rendering a single static frame.
 */
export default function Globe({
  size = 320,
  density = 6,
  showRings = true,
  showArcs = true,
  showNodes = true,
  autoRotate = true,
  className,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let raf = 0;

    const run = () => {
      const COLOR_ACCENT = new THREE.Color("#c8d4de");
      const COLOR_ACCENT_STRONG = new THREE.Color("#d8e2ec");
      const COLOR_ACCENT_DEEP = new THREE.Color("#8a9aa6");
      const COLOR_GREEN = new THREE.Color("#4ade80");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.z = 3.4;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size, false);
      container.appendChild(renderer.domElement);

      const globe = new THREE.Group();
      scene.add(globe);

      // Wireframe sphere — soft meridian/parallel lines
      const sphereGeo = new THREE.SphereGeometry(1, 36, 24);
      const wireMat = new THREE.LineBasicMaterial({
        color: COLOR_ACCENT,
        transparent: true,
        opacity: 0.1,
      });
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(sphereGeo),
        wireMat,
      );
      globe.add(wire);
      sphereGeo.dispose();

      // Fibonacci-distributed surface dots
      const dotCount = Math.max(120, density * 110);
      const dotPositions = new Float32Array(dotCount * 3);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < dotCount; i++) {
        const y = 1 - (i / (dotCount - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        dotPositions[i * 3] = Math.cos(theta) * r * 1.005;
        dotPositions[i * 3 + 1] = y * 1.005;
        dotPositions[i * 3 + 2] = Math.sin(theta) * r * 1.005;
      }
      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(dotPositions, 3),
      );
      const dotMat = new THREE.PointsMaterial({
        color: COLOR_ACCENT,
        size: 0.02,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });
      const dots = new THREE.Points(dotGeo, dotMat);
      globe.add(dots);

      // Orbital rings around the planet, each tilted
      const ringMats: THREE.Material[] = [];
      const ringGeos: THREE.BufferGeometry[] = [];
      const rings: THREE.Mesh[] = [];
      if (showRings) {
        const ringDefs = [
          { r: 1.22, tilt: 0.35, spin: 1 },
          { r: 1.42, tilt: -0.5, spin: -0.6 },
          { r: 1.62, tilt: 0.9, spin: 0.45 },
        ];
        ringDefs.forEach((def) => {
          const geo = new THREE.RingGeometry(def.r, def.r + 0.004, 128, 1);
          const mat = new THREE.MeshBasicMaterial({
            color: COLOR_ACCENT_DEEP,
            transparent: true,
            opacity: 0.28,
            side: THREE.DoubleSide,
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.rotation.x = Math.PI / 2 + def.tilt;
          mesh.rotation.z = def.tilt * 0.4;
          mesh.userData.spin = def.spin;
          scene.add(mesh);
          rings.push(mesh);
          ringGeos.push(geo);
          ringMats.push(mat);
        });
      }

      // Small satellite nodes riding the rings (green pings)
      const satellites: Array<{ mesh: THREE.Mesh; ring: THREE.Mesh; phase: number; speed: number; radius: number }> = [];
      const satGeos: THREE.BufferGeometry[] = [];
      const satMats: THREE.Material[] = [];
      if (showNodes && showRings) {
        rings.forEach((ring, i) => {
          const count = i === 0 ? 2 : 1;
          for (let j = 0; j < count; j++) {
            const geo = new THREE.SphereGeometry(0.025, 12, 12);
            const mat = new THREE.MeshBasicMaterial({
              color: i === 0 ? COLOR_GREEN : COLOR_ACCENT_STRONG,
              transparent: true,
              opacity: 0.9,
            });
            const mesh = new THREE.Mesh(geo, mat);
            scene.add(mesh);
            satellites.push({
              mesh,
              ring,
              phase: Math.random() * Math.PI * 2,
              speed: (0.6 + Math.random() * 0.5) * (ring.userData.spin as number),
              radius: (ring.geometry as THREE.RingGeometry).parameters.innerRadius,
            });
            satGeos.push(geo);
            satMats.push(mat);
          }
        });
      }

      // Arc beams — ephemeral network links between random surface points
      type Arc = {
        line: THREE.Line;
        geo: THREE.BufferGeometry;
        mat: THREE.LineBasicMaterial;
        life: number;
        lifeMax: number;
      };
      const arcs: Arc[] = [];

      const randomSurfacePoint = (): THREE.Vector3 => {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        return new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.sin(phi) * Math.sin(theta),
          Math.cos(phi),
        );
      };

      const spawnArc = () => {
        const a = randomSurfacePoint();
        const b = randomSurfacePoint();
        const dist = a.distanceTo(b);
        const mid = a
          .clone()
          .add(b)
          .normalize()
          .multiplyScalar(1 + Math.min(0.6, dist * 0.4));
        const curve = new THREE.QuadraticBezierCurve3(
          a.multiplyScalar(1.01),
          mid,
          b.multiplyScalar(1.01),
        );
        const points = curve.getPoints(48);
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
          color: COLOR_ACCENT_STRONG,
          transparent: true,
          opacity: 0,
        });
        const line = new THREE.Line(geo, mat);
        globe.add(line);
        arcs.push({
          line,
          geo,
          mat,
          life: 0,
          lifeMax: 90 + Math.random() * 80,
        });
      };

      const ARC_TARGET = 8;
      if (showArcs) {
        for (let i = 0; i < ARC_TARGET; i++) spawnArc();
      }

      // Gentle tilt so the globe reads as a planet, not a ball
      globe.rotation.z = 0.25;
      globe.rotation.x = -0.15;

      container.dataset.ready = "true";

      let t = 0;
      const animate = () => {
        t += 0.004;

        if (autoRotate && !prefersReducedMotion) {
          globe.rotation.y = t * 0.45;
        }

        if (showRings && !prefersReducedMotion) {
          rings.forEach((ring) => {
            ring.rotation.z += 0.0015 * (ring.userData.spin as number);
          });
        }

        if (satellites.length && !prefersReducedMotion) {
          satellites.forEach((s) => {
            s.phase += 0.012 * s.speed;
            const local = new THREE.Vector3(
              Math.cos(s.phase) * s.radius,
              Math.sin(s.phase) * s.radius,
              0,
            );
            s.mesh.position.copy(local.applyMatrix4(s.ring.matrixWorld));
            const pulse = 0.75 + Math.sin(t * 4 + s.phase) * 0.25;
            (s.mesh.material as THREE.MeshBasicMaterial).opacity = pulse;
          });
        }

        if (showArcs) {
          for (let i = arcs.length - 1; i >= 0; i--) {
            const arc = arcs[i];
            arc.life += 1;
            const p = arc.life / arc.lifeMax;
            arc.mat.opacity = Math.sin(p * Math.PI) * 0.7;
            if (arc.life >= arc.lifeMax) {
              globe.remove(arc.line);
              arc.geo.dispose();
              arc.mat.dispose();
              arcs.splice(i, 1);
            }
          }
          while (arcs.length < ARC_TARGET) spawnArc();
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(animate);
      }

      return () => {
        cancelAnimationFrame(raf);
        arcs.forEach((arc) => {
          arc.geo.dispose();
          arc.mat.dispose();
        });
        satGeos.forEach((g) => g.dispose());
        satMats.forEach((m) => m.dispose());
        ringGeos.forEach((g) => g.dispose());
        ringMats.forEach((m) => m.dispose());
        dotGeo.dispose();
        dotMat.dispose();
        wire.geometry.dispose();
        wireMat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    const dispose = run();
    return () => {
      dispose();
    };
  }, [size, density, showRings, showArcs, showNodes, autoRotate]);

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
