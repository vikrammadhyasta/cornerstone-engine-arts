import * as React from "react";
import { cn } from "@/lib/utils";
import { STAGES } from "./pipeline-data";

export function DeliveryPipeline() {
  const [activeId, setActiveId] = React.useState(STAGES[0].id);
  const active = STAGES.find((s) => s.id === activeId) ?? STAGES[0];
  const activeIndex = STAGES.findIndex((s) => s.id === active.id);

  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const map: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: STAGES.length - 1,
    };
    const next = map[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const clamped = (next + STAGES.length) % STAGES.length;
    setActiveId(STAGES[clamped].id);
    refs.current[clamped]?.focus();
  };

  return (
    <div className="surface-panel overflow-hidden p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
          Deployment lifecycle
        </p>
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
          Stage {String(activeIndex + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
        </p>
      </div>

      {/* Stage rail */}
      <div
        role="tablist"
        aria-label="Deployment pipeline stages"
        aria-orientation="horizontal"
        className="mt-6 flex flex-col md:grid md:grid-cols-2 md:gap-3 lg:flex lg:flex-row lg:items-stretch lg:gap-0"
      >
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = stage.id === active.id;
          const isPassed = index < activeIndex;
          return (
            <React.Fragment key={stage.id}>
              {index > 0 && <Connector active={index <= activeIndex} />}
              <button
                ref={(el) => {
                  refs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`stage-tab-${stage.id}`}
                aria-selected={isActive}
                aria-controls="stage-detail"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(stage.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={cn(
                  "group relative flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors duration-300",
                  "lg:w-auto lg:flex-1 lg:flex-col lg:items-start lg:gap-3 lg:p-4",
                  isActive
                    ? "border-primary/45 bg-primary/8 shadow-[var(--shadow-glow)]"
                    : "border-border bg-surface/50 hover:border-border-strong hover:bg-surface/80",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-lg border transition-colors duration-300",
                    isActive
                      ? "border-primary/50 bg-primary/12 text-primary"
                      : isPassed
                        ? "border-border-strong bg-surface text-foreground"
                        : "border-border bg-surface/70 text-muted-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
                      {stage.phase}
                    </span>
                  </span>
                  <span className="mt-1 block truncate font-display text-sm font-semibold text-foreground">
                    {stage.name}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        stage.statusTone === "success" ? "bg-success" : "bg-primary",
                      )}
                    />
                    <span className="truncate text-[0.6875rem] text-muted-foreground">
                      {stage.status}
                    </span>
                  </span>
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Stage detail */}
      <div
        id="stage-detail"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active.id}`}
        tabIndex={0}
        className="mt-6 rounded-xl border border-border bg-surface/40 p-5 md:p-6"
      >
        <h3 className="font-display text-lg font-semibold text-foreground">
          {active.phase} — {active.name}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {active.short}
        </p>

        <dl className="mt-5 grid gap-5 md:grid-cols-[14rem_minmax(0,1fr)]">
          <div className="space-y-4">
            <div>
              <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                Trigger
              </dt>
              <dd className="mt-1 text-sm text-foreground">{active.detail.trigger}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                Output
              </dt>
              <dd className="mt-1 text-sm text-foreground">{active.detail.output}</dd>
            </div>
          </div>
          <div>
            <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
              What happens here
            </dt>
            <dd>
              <ul className="mt-2 space-y-2">
                {active.detail.work.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className="flex items-center justify-center py-1 md:hidden lg:flex lg:w-6 lg:py-0"
    >
      <span
        className={cn(
          "h-5 w-px rounded-full transition-colors duration-500 lg:h-px lg:w-full",
          active ? "bg-primary/60" : "bg-border-strong",
        )}
      />
    </span>
  );
}
