import * as React from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

/** Minimal back-to-top control. Appears after meaningful scrolling. */
export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setVisible(window.scrollY > window.innerHeight * 0.9);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "fixed right-4 bottom-4 z-40 grid h-10 w-10 place-items-center rounded-full",
        "border border-border bg-surface/80 text-muted-foreground backdrop-blur-md",
        "transition-[opacity,transform,color] duration-200 ease-out",
        "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "xl:right-4 xl:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="h-4 w-4" aria-hidden />
    </button>
  );
}
