import { useEffect, useRef, useState } from "react";
import { FAILURE_LOOP, SUCCESS_LOOP, type RunMode } from "./demo";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Milliseconds into the current run's loop, driven by rAF. Restarts on mode
 * change. Returns null under prefers-reduced-motion so callers can render
 * the frozen static frame instead.
 */
export function useDemoClock(mode: RunMode): number | null {
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  const startRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();
    setT(0);
  }, [mode]);

  useEffect(() => {
    if (reduced) return;
    const loop = mode === "success" ? SUCCESS_LOOP : FAILURE_LOOP;
    let raf = 0;
    const tick = (now: number) => {
      setT((now - startRef.current) % loop);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, reduced]);

  return reduced ? null : t;
}
