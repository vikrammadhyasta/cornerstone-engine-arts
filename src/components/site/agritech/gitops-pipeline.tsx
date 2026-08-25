import { useState } from "react";
import { cn } from "@/lib/utils";
import { Diagnostics } from "./rail/Diagnostics";
import { PipelineRail } from "./rail/PipelineRail";
import { frameAt, STATIC_FRAME, type RunMode } from "./rail/demo";
import { useDemoClock } from "./rail/use-demo-clock";

/**
 * The AgriTech delivery pipeline as an interactive, deterministic
 * visualization. Every animated element is a pure function of (mode, t);
 * under prefers-reduced-motion the clock returns null and a frozen frame is
 * rendered instead, so the architecture stays fully readable without motion.
 */
function ModeButton({
  active,
  tone,
  onClick,
  children,
}: {
  active: boolean;
  tone: "pipe" | "fail";
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "px-3.5 py-1.5 transition-colors",
        active && tone === "pipe" && "bg-pipe/15 text-pipe",
        active && tone === "fail" && "bg-fail/15 text-fail",
        !active && "text-muted-foreground/70 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function GitopsPipeline() {
  const [mode, setMode] = useState<RunMode>("success");
  const t = useDemoClock(mode);
  const frame = t === null ? STATIC_FRAME : frameAt(mode, t);
  const incident = frame.runLabel.startsWith("INCIDENT");

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <p
          className={cn(
            "font-mono text-[10px] tracking-[0.25em] uppercase",
            incident ? "text-fail/80" : "text-pipe/80",
          )}
          aria-live="polite"
        >
          {frame.runLabel}
        </p>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div
            role="group"
            aria-label="Pipeline run scenario"
            className="flex overflow-hidden rounded-full border border-border font-mono text-[10px] tracking-[0.15em]"
          >
            <ModeButton
              active={mode === "success"}
              tone="pipe"
              onClick={() => setMode("success")}
            >
              ▶ SUCCESSFUL RUN
            </ModeButton>
            <ModeButton
              active={mode === "failure"}
              tone="fail"
              onClick={() => setMode("failure")}
            >
              ✕ FAILED RUN
            </ModeButton>
          </div>
          <ul className="hidden items-center gap-5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground sm:flex">
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-ok" /> COMPLETED
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-pipe" /> RUNNING
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-muted-foreground/40" /> QUEUED
            </li>
          </ul>
        </div>
      </div>

      <PipelineRail frame={frame} />
      <Diagnostics diag={frame.diag} />
    </div>
  );
}
