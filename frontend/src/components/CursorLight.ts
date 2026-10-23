import * as React from "react";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/** Writes cursor-driven light variables (--lx --ly --ang --r --r2 --rf --bx --by) to the element. */
export function useCursorLight<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const pointer = { x: 0, y: 0, active: false };
    const light = { x: 0, y: 0, ready: false };
    let raf = 0;

    const paint = (w: number, h: number) => {
      const dx = light.x - w / 2;
      const dy = light.y - h / 2;
      const ang = (Math.atan2(-dx, -dy + h * 0.5) * 180) / Math.PI;

      el.style.setProperty("--lx", `${light.x.toFixed(1)}px`);
      el.style.setProperty("--ly", `${light.y.toFixed(1)}px`);
      el.style.setProperty("--ang", `${ang.toFixed(1)}deg`);
      el.style.setProperty("--r", `${(w * 0.42).toFixed(1)}px`);
      el.style.setProperty("--r2", `${(w * 0.07).toFixed(1)}px`);
      el.style.setProperty("--rf", `${(w * 1.1).toFixed(1)}px`);
      el.style.setProperty("--bx", `${50 + clamp(dx / w, -1, 1) * 40}%`);
      el.style.setProperty("--by", `${50 + clamp(dy / h, -1, 1) * 40}%`);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onRelease = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") pointer.active = false;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onRelease, { passive: true });
    window.addEventListener("pointercancel", onRelease, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);

    const tick = (t: number) => {
      const rect = el.getBoundingClientRect();
      const w = rect.width || 1;
      const h = rect.height || 1;

      const tx = pointer.active
        ? pointer.x - rect.left
        : reduceMotion
          ? w * 0.3
          : w * (0.5 + 0.42 * Math.sin(t / 2600));
      const ty = pointer.active
        ? pointer.y - rect.top
        : reduceMotion
          ? h * 0.18
          : h * (0.22 + 0.14 * Math.cos(t / 3100));

      if (!light.ready) {
        light.x = tx;
        light.y = ty;
        light.ready = true;
      } else {
        const ease = reduceMotion ? 1 : 0.14;
        light.x += (tx - light.x) * ease;
        light.y += (ty - light.y) * ease;
      }

      paint(w, h);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}