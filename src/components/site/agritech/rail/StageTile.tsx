import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Stage } from "./data";
import type { StageRunState } from "./demo";

/**
 * One technology station. Every stage uses the same container geometry —
 * brand marks are normalized inside a 24×24 viewBox so no logo is ever
 * stretched or cropped to fit. Status, progress and meta arrive per frame
 * from the deterministic demo timeline.
 */
export function StageTile({
  stage,
  run,
  size = "lg",
}: {
  stage: Stage;
  run: StageRunState;
  size?: "lg" | "md" | "sm";
}) {
  const { Icon, tone } = stage;
  const { status } = run;

  const box =
    size === "lg"
      ? "size-[88px] rounded-2xl"
      : size === "md"
        ? "size-[72px] rounded-2xl"
        : "size-16 rounded-xl";
  const icon =
    size === "lg" ? "size-10" : size === "md" ? "size-8" : "size-7";

  return (
    <div
      className={cn(
        "tile relative grid shrink-0 place-items-center border transition-[border-color,box-shadow] duration-300",
        box,
        status === "active" &&
          "border-pipe/50 shadow-[0_0_44px_-10px_var(--color-pipe)]",
        status === "completed" && "border-border",
        status === "failed" &&
          "border-fail/50 shadow-[0_0_44px_-10px_var(--color-fail)]",
        status === "pending" && "border-border/70",
      )}
    >
      {status === "active" && <span aria-hidden className="pulse-ring" />}
      <Icon
        className={cn(
          icon,
          tone,
          "transition-opacity duration-300",
          status === "pending" && "opacity-30 saturate-[0.4]",
        )}
      />
      {status === "completed" && (
        <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ok text-background shadow-[0_0_12px_-2px_var(--color-ok)]">
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}
      {status === "failed" && (
        <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-fail text-background shadow-[0_0_12px_-2px_var(--color-fail)]">
          <X className="size-3" strokeWidth={3} />
        </span>
      )}
      {status === "active" && (
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-pipe shadow-[0_0_12px_2px_color-mix(in_oklab,var(--color-pipe)_60%,transparent)]" />
      )}
    </div>
  );
}

/** Index, name, role and live status line shown beside/below a tile. */
export function StageMeta({
  stage,
  run,
  align = "center",
}: {
  stage: Stage;
  run: StageRunState;
  align?: "center" | "left";
}) {
  const pending = run.status === "pending";
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "center" ? "items-center text-center" : "items-start pt-1",
      )}
    >
      <div className="flex items-baseline gap-2.5">
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.3em]",
            pending && "text-muted-foreground/50",
            run.status === "failed" && "text-fail/80",
            (run.status === "active" || run.status === "completed") &&
              "text-pipe/80",
          )}
        >
          {stage.index}
        </span>
        <h3
          className={cn(
            "font-display text-[15px] font-semibold tracking-tight",
            pending && "text-foreground/55",
          )}
        >
          {stage.name}
        </h3>
      </div>
      <p className="font-mono text-[11px] text-muted-foreground">{stage.sub}</p>
      <p
        className={cn(
          "flex items-center gap-1.5 font-mono text-[11px]",
          run.status === "completed" && "text-ok",
          run.status === "active" && "text-pipe",
          run.status === "failed" && "text-fail",
          pending && "text-muted-foreground/50",
        )}
      >
        {run.status === "active" && (
          <span className="size-1.5 animate-pulse rounded-full bg-pipe" />
        )}
        {run.status === "completed" && "✓ "}
        {run.status === "failed" && "✕ "}
        {run.meta}
      </p>
      {/* Progress track — always rendered (hidden when idle) so the rail never shifts. */}
      <div
        className={cn(
          "mt-1 h-px w-28 overflow-hidden rounded-full transition-opacity duration-300",
          run.progress === null ? "opacity-0" : "bg-border/80",
        )}
      >
        {run.progress !== null && (
          <div
            className={cn(
              "h-full",
              run.status === "failed" ? "bg-fail" : "bg-pipe",
            )}
            style={{ width: `${Math.min(100, run.progress * 100)}%` }}
          />
        )}
      </div>
    </div>
  );
}
