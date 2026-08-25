import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { STAGES } from "./pipeline-data";

/**
 * Responsive topology:
 * - mobile  : single column, downward connectors
 * - tablet  : serpentine — row 1 left→right, elbow down, row 2 right→left
 * - desktop : single row, left→right
 */
const STAGE_POS = [
  "md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1",
  "md:col-start-3 md:row-start-1 lg:col-start-3 lg:row-start-1",
  "md:col-start-5 md:row-start-1 lg:col-start-5 lg:row-start-1",
  "md:col-start-5 md:row-start-3 lg:col-start-7 lg:row-start-1",
  "md:col-start-3 md:row-start-3 lg:col-start-9 lg:row-start-1",
  "md:col-start-1 md:row-start-3 lg:col-start-11 lg:row-start-1",
];

const CONNECTOR_POS = [
  "md:col-start-2 md:row-start-1 lg:col-start-2 lg:row-start-1",
  "md:col-start-4 md:row-start-1 lg:col-start-4 lg:row-start-1",
  "md:col-start-5 md:row-start-2 lg:col-start-6 lg:row-start-1",
  "md:col-start-4 md:row-start-3 lg:col-start-8 lg:row-start-1",
  "md:col-start-2 md:row-start-3 lg:col-start-10 lg:row-start-1",
];

const CONNECTOR_DIR: Array<"right" | "left" | "down"> = [
  "right",
  "right",
  "down",
  "left",
  "left",
];

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

      {/* Stage topology */}
      <div
        role="tablist"
        aria-label="Deployment pipeline stages"
        aria-orientation="horizontal"
        className={cn(
          "mt-6 grid grid-cols-1 gap-0",
          "md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-y-1",
          "lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]",
        )}
      >
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = stage.id === active.id;
          const isPassed = index < activeIndex;
          return (
            <React.Fragment key={stage.id}>
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
                  "md:h-full md:flex-col md:items-start md:gap-3",
                  STAGE_POS[index],
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

                <span className="min-w-0 flex-1 md:w-full md:flex-none">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
                      {stage.phase}
                    </span>
                  </span>
                  <span className="mt-1 block truncate font-display text-sm font-semibold text-foreground">
                    {stage.name}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        stage.statusTone === "success" ? "bg-success" : "bg-primary",
                      )}
                    />
                    <span className="truncate text-[0.6875rem] text-muted-foreground">
                      {stage.status}
                    </span>
                  </span>
                </span>
              </button>

              {index < STAGES.length - 1 && (
                <Connector
                  className={CONNECTOR_POS[index]}
                  mdDir={CONNECTOR_DIR[index]}
                  active={index < activeIndex}
                />
              )}
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
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
            Stage {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[0.6875rem] text-muted-foreground"
          >
            <span
              aria-hidden
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                active.statusTone === "success" ? "bg-success" : "bg-primary",
              )}
            />
            {active.status}
          </span>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
          {active.phase} — {active.name}
        </h3>
        <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.14em] text-primary/90 uppercase">
          {active.role}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
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

function Connector({
  className,
  mdDir,
  active,
}: {
  className?: string;
  mdDir: "right" | "left" | "down";
  active: boolean;
}) {
  const tone = active ? "text-primary/70" : "text-border-strong";
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center gap-1 py-1.5",
        mdDir === "down" ? "md:flex-col md:py-1.5" : "md:flex-row md:px-1.5 md:py-0",
        "lg:flex-row lg:px-1.5 lg:py-0",
        mdDir === "left" && "md:flex-row-reverse lg:flex-row",
        tone,
        className,
      )}
    >
      <span
        className={cn(
          "block h-4 w-px shrink-0 rounded-full bg-current opacity-70",
          mdDir === "down" ? "md:h-4 md:w-px" : "md:h-px md:w-4 md:min-w-4",
          "lg:h-px lg:w-4 lg:min-w-4",
        )}
      />
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 shrink-0",
          mdDir === "right" && "md:-rotate-90",
          mdDir === "left" && "md:rotate-90",
          "lg:-rotate-90",
        )}
      />
    </span>
  );
}
