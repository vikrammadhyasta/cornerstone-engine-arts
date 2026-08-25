import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { logLines, type LogTone } from "./data";
import type { DiagFrame } from "./demo";
import { JenkinsIcon, OpenAIIcon } from "./icons";

function Chip({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "fail" | "pipe";
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.15em]",
        tone === "fail" && "border-fail/30 bg-fail/10 text-fail",
        tone === "pipe" && "border-pipe/30 bg-pipe/10 text-pipe",
        tone === "default" && "border-border bg-surface/60 text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

function DiagArrow({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 flex-col items-center justify-center gap-1.5 lg:flex-row",
        active ? "text-fail/70" : "text-muted-foreground/40",
      )}
    >
      <span className={cn("h-6 lg:hidden", active ? "dash-line-y" : "dash-dormant-y")} />
      <span className={cn("hidden w-9 lg:block", active ? "dash-line-x" : "dash-dormant-x")} />
      <ChevronDown className="size-4 lg:hidden" />
      <ChevronRight className="hidden size-4 lg:block" />
    </div>
  );
}

/* Card 1 — the failing Jenkins build, routed out of the main flow. */
function FailureCard({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "tile relative flex flex-1 flex-col rounded-2xl border p-5 transition-opacity duration-500 lg:flex-[0.9]",
        active ? "border-fail/25" : "border-border opacity-60 saturate-[0.55]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-lg border",
              active ? "border-fail/30 bg-fail/10" : "border-border bg-surface/60",
            )}
          >
            <JenkinsIcon className="size-5 text-brand-jenkins" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold tracking-tight">
              Jenkins Failure
            </p>
            <p className="font-mono text-[11px] text-muted-foreground">
              build #248 · push-image
            </p>
          </div>
        </div>
        {active ? (
          <span className="flex items-center gap-1.5 rounded-full border border-fail/30 bg-fail/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-fail">
            <span className="size-1.5 animate-pulse rounded-full bg-fail" />
            FAILED
          </span>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
            DORMANT
          </span>
        )}
      </div>

      <dl className="mb-6 mt-5 space-y-2.5 font-mono text-[11px]">
        {[
          ["exit code", "1"],
          ["duration", "4m 07s"],
          ["failed step", "docker push → ECR"],
          ["log capture", "console output"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4">
            <dt className="shrink-0 text-muted-foreground/70">{k}</dt>
            <dd className="truncate text-right text-foreground/85">
              {active ? v : "—"}
            </dd>
          </div>
        ))}
      </dl>

      <p
        className={cn(
          "mt-auto border-t pt-3 font-mono text-[10px] tracking-[0.22em]",
          active
            ? "border-fail/15 text-fail/70"
            : "border-border/60 text-muted-foreground/60",
        )}
      >
        {active ? "ROUTED TO DIAGNOSTICS →" : "DIAGNOSTICS BRANCH · STANDBY"}
      </p>
    </div>
  );
}

const toneClass: Record<LogTone, string> = {
  dim: "text-muted-foreground/60",
  normal: "text-foreground/80",
  ok: "text-ok/90",
  fail: "text-fail",
};

/* Card 2 — the captured build log as a terminal window. Lines are revealed
   deterministically, one at a time, while the capture is live. */
function TerminalCard({ diag }: { diag: DiagFrame }) {
  const active = diag.active;
  const revealed = diag.revealedLogs;
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [revealed, active]);

  return (
    <div
      className={cn(
        "terminal overflow-hidden rounded-2xl border border-border transition-opacity duration-500 lg:flex-[1.25]",
        !active && "opacity-60 saturate-[0.55]",
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-fail/70" />
        <span className="size-2.5 rounded-full bg-warn/60" />
        <span className="size-2.5 rounded-full bg-ok/50" />
        <span className="ml-2 font-mono text-[11px] text-muted-foreground">
          {active ? "jenkins · #248 · console" : "console · idle"}
        </span>
        {!active ? (
          <span className="ml-auto font-mono text-[10px] tracking-[0.12em] text-muted-foreground/60">
            IDLE
          </span>
        ) : (
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-fail/90">
            {revealed < logLines.length && (
              <span className="size-1.5 animate-pulse rounded-full bg-fail" />
            )}
            {revealed < logLines.length ? "CAPTURING" : "CAPTURED"}
          </span>
        )}
      </div>

      {!active ? (
        <div className="grid h-52 place-items-center">
          <p className="font-mono text-[11px] text-muted-foreground/50">
            — log capture idle · awaiting incident —
          </p>
        </div>
      ) : (
        <div ref={bodyRef} className="log-mask h-52 overflow-y-auto">
          <div className="py-2">
            {revealed === 0 && (
              <p className="px-4 py-[3px] font-mono text-[11.5px] text-muted-foreground/50">
                attaching to jenkins #248 console…
              </p>
            )}
            {logLines.slice(0, revealed).map((l, i) => (
              <p
                key={i}
                className={cn(
                  "log-line-in flex gap-3 px-4 py-[3px] font-mono text-[11.5px] leading-relaxed",
                  l.tone === "fail" && "bg-fail/[0.07]",
                )}
              >
                <span className="shrink-0 text-muted-foreground/45">{l.t}</span>
                <span className={toneClass[l.tone]}>{l.text}</span>
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border/70 px-4 py-2 font-mono text-[10.5px] text-muted-foreground/80">
        <span>{active ? "jenkins console · 4m 07s" : "standby"}</span>
        {active && (
          <span className="flex items-center gap-1.5">
            tail -f
            <span className="caret text-pipe">▍</span>
          </span>
        )}
      </div>
    </div>
  );
}

/* Card 3 — the AI diagnosis: processing, then root cause and confidence. */
function AnalysisCard({ diag }: { diag: DiagFrame }) {
  const active = diag.active;
  const processing = active && !diag.showRootCause;

  return (
    <div
      className={cn(
        "tile relative overflow-hidden rounded-2xl border border-border p-5 transition-opacity duration-500 lg:flex-[1.25]",
        !active && "opacity-60 saturate-[0.55]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-lg border",
              active ? "border-pipe/25 bg-pipe/10" : "border-border bg-surface/60",
            )}
          >
            <OpenAIIcon className="size-5 text-brand-openai" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold tracking-tight">
              OpenAI Analysis
            </p>
            <p className="font-mono text-[11px] text-muted-foreground">
              {active ? "root-cause · jenkins console log" : "standby · no incidents"}
            </p>
          </div>
        </div>
        {processing && (
          <span className="flex items-center gap-1 pt-1" aria-hidden>
            <span className="think-dot size-1 rounded-full bg-pipe" />
            <span
              className="think-dot size-1 rounded-full bg-pipe"
              style={{ animationDelay: "180ms" }}
            />
            <span
              className="think-dot size-1 rounded-full bg-pipe"
              style={{ animationDelay: "360ms" }}
            />
          </span>
        )}
      </div>

      <div className="relative mt-4 h-px overflow-hidden bg-border/70">
        {processing && (
          <div className="scan-line absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-pipe to-transparent" />
        )}
      </div>

      {!active ? (
        <div className="mt-4 grid min-h-[168px] place-items-center rounded-lg border border-dashed border-border/60">
          <p className="font-mono text-[11px] text-muted-foreground/50">
            — awaiting incident —
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4">
            <p className="font-mono text-[10px] tracking-[0.25em] text-pipe/80">
              ROOT CAUSE
            </p>
            {diag.showRootCause ? (
              <p className="animate-fade-in mt-2 min-h-[60px] text-[13px] leading-relaxed text-foreground/85">
                The ECR authorization token was minted in the pipeline
                preamble and had expired by the time the image was pushed —{" "}
                <span className="font-mono text-[12px] text-fail">
                  denied: authorization token has expired
                </span>
                . A credential-lifetime issue, not a build regression.
              </p>
            ) : (
              <div className="mt-2 min-h-[60px]">
                <p className="text-[13px] text-muted-foreground/70">
                  parsing captured console output…
                </p>
                <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-border/70">
                  <div
                    className="h-full bg-pipe"
                    style={{ width: `${diag.analysisProgress * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="font-mono text-[10px] tracking-[0.25em] text-pipe/80">
              SUGGESTED FIX
            </p>
            {diag.showFix ? (
              <p className="animate-fade-in mt-2 rounded-lg border border-border/70 bg-background/60 px-3 py-2 font-mono text-[11px] leading-relaxed text-foreground/80">
                Jenkinsfile → move{" "}
                <span className="text-muted-foreground">aws ecr get-login-password</span>{" "}
                into the push-image stage, immediately before docker push
              </p>
            ) : (
              <p className="mt-2 rounded-lg border border-dashed border-border/60 px-3 py-2 font-mono text-[11px] text-muted-foreground/50">
                —
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {diag.showChips ? (
              <>
                <Chip tone="pipe">category · registry auth</Chip>
                <Chip>severity · blocking</Chip>
              </>
            ) : (
              <Chip>PENDING</Chip>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function Diagnostics({ diag }: { diag: DiagFrame }) {
  const active = diag.active;
  return (
    <section id="diagnostics" aria-label="Failure diagnostics" className="mt-14 md:mt-16">
      {/* Branch drop — aligns under the Jenkins station on md+ (col 2 of 3 / col 2 of 6). */}
      <div aria-hidden className="pointer-events-none relative hidden h-14 md:block lg:h-16">
        <span
          className={cn(
            "absolute left-1/2 top-0 h-full lg:left-[25%]",
            active ? "dash-line-y" : "dash-dormant-y",
          )}
        />
        <span
          className={cn(
            "absolute left-[calc(50%+12px)] top-1/2 -translate-y-1/2 rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] lg:left-[calc(25%+12px)]",
            active
              ? "border-fail/25 bg-fail/10 text-fail/90"
              : "border-border bg-surface/60 text-muted-foreground/70",
          )}
        >
          {active ? "BUILD #248 · FAILED" : "BRANCH IDLE"}
        </span>
        <span
          className={cn(
            "absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1/2 rounded-full lg:left-[25%]",
            active
              ? "bg-fail shadow-[0_0_10px_2px_color-mix(in_oklab,var(--color-fail)_50%,transparent)]"
              : "bg-muted-foreground/40",
          )}
        />
      </div>

      {/* Mobile branch marker */}
      <div className="mb-6 md:hidden">
        <span
          className={cn(
            "rounded border px-2 py-1 font-mono text-[10px] tracking-[0.15em]",
            active
              ? "border-fail/25 bg-fail/10 text-fail/90"
              : "border-border bg-surface/60 text-muted-foreground/70",
          )}
        >
          {active ? "↳ FROM JENKINS CI · BUILD #248 FAILED" : "↳ DIAGNOSTICS BRANCH · STANDBY"}
        </span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className={cn(
              "flex items-center gap-2 font-mono text-[10px] tracking-[0.3em]",
              active ? "text-fail/80" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                active ? "animate-pulse bg-fail" : "bg-muted-foreground/40",
              )}
            />
            02 — FAILURE DIAGNOSTICS
          </p>
          <h2 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
            Every failure gets a root cause
          </h2>
        </div>
        <Chip tone={active ? "fail" : "default"}>{diag.chipLabel}</Chip>
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <FailureCard active={active} />
        <DiagArrow active={active} />
        <TerminalCard diag={diag} />
        <DiagArrow active={active} />
        <AnalysisCard diag={diag} />
      </div>
    </section>
  );
}
