import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { STAGES } from "./pipeline-data";

/**
 * Deployment rail — a control-surface style visualization of the delivery path.
 *
 * Responsive topology:
 * - mobile  : single column, thin vertical rail
 * - tablet  : serpentine — row 1 left→right, elbow down, row 2 right→left
 * - desktop : single spacious horizontal rail
 *
 * Nodes are small technical markers on an open canvas rather than cards; the
 * only real surface on the page is the stage detail panel below the rail.
 */
const STAGE_POS = [
  "md:max-lg:col-start-1 md:max-lg:row-start-1 lg:col-start-1 lg:row-start-1",
  "md:max-lg:col-start-3 md:max-lg:row-start-1 lg:col-start-3 lg:row-start-1",
  "md:max-lg:col-start-5 md:max-lg:row-start-1 lg:col-start-5 lg:row-start-1",
  "md:max-lg:col-start-5 md:max-lg:row-start-3 lg:col-start-7 lg:row-start-1",
  "md:max-lg:col-start-3 md:max-lg:row-start-3 lg:col-start-9 lg:row-start-1",
  "md:max-lg:col-start-1 md:max-lg:row-start-3 lg:col-start-11 lg:row-start-1",
];

const CONNECTOR_POS = [
  "md:max-lg:col-start-2 md:max-lg:row-start-1 lg:col-start-2 lg:row-start-1",
  "md:max-lg:col-start-4 md:max-lg:row-start-1 lg:col-start-4 lg:row-start-1",
  "md:max-lg:col-start-5 md:max-lg:row-start-2 lg:col-start-6 lg:row-start-1",
  "md:max-lg:col-start-4 md:max-lg:row-start-3 lg:col-start-8 lg:row-start-1",
  "md:max-lg:col-start-2 md:max-lg:row-start-3 lg:col-start-10 lg:row-start-1",
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
    <div>
      {/* Open canvas holding the rail */}
      <div className="relative isolate overflow-hidden rounded-2xl border border-border/70">
        {/* atmosphere */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 grid-texture opacity-60"
          style={{
            maskImage: "radial-gradient(80% 90% at 50% 50%, black, transparent 100%)",
            WebkitMaskImage: "radial-gradient(80% 90% at 50% 50%, black, transparent 100%)",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 90% at 50% -20%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 65%)",
          }}
        />

        <div className="px-5 pt-5 pb-8 md:px-8 md:pt-6 md:pb-12 lg:px-10 lg:pt-8 lg:pb-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
              Deployment rail
            </p>
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
              Stage {String(activeIndex + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
            </p>
          </div>

          {/* Stage topology */}
          <div
            role="tablist"
            aria-label="Deployment pipeline stages"
            aria-orientation="horizontal"
            className={cn(
              "mt-8 grid grid-cols-1 gap-0 md:mt-10 lg:mt-14",
              "md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-y-8",
              "lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-y-0",
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
                      "group flex w-full items-center gap-4 rounded-lg px-1 py-2 text-left transition-colors duration-300",
                      "md:flex-col md:items-center md:gap-3 md:px-2 md:py-0 md:text-center",
                      STAGE_POS[index],
                    )}
                  >
                    {/* node marker with concentric geometry */}
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center md:h-14 md:w-14">
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-0 rounded-full border transition-colors duration-500",
                          isActive
                            ? "border-primary/25"
                            : "border-border/60 group-hover:border-border-strong",
                        )}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-[0.3rem] rounded-full border transition-all duration-500",
                          isActive
                            ? "border-primary/60 bg-primary/10 shadow-[var(--shadow-glow)]"
                            : isPassed
                              ? "border-border-strong bg-surface/70"
                              : "border-border bg-surface/40",
                        )}
                      />
                      <Icon
                        className={cn(
                          "relative h-5 w-5 transition-colors duration-300",
                          isActive
                            ? "text-primary"
                            : isPassed
                              ? "text-foreground/80"
                              : "text-muted-foreground group-hover:text-foreground/80",
                        )}
                      />
                    </span>

                    {/* labels around the node */}
                    <span className="min-w-0 flex-1 md:w-full md:flex-none">
                      <span className="block font-mono text-[0.625rem] tracking-[0.22em] text-muted-foreground/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block truncate font-display text-[0.8125rem] font-semibold tracking-tight transition-colors duration-300",
                          isActive ? "text-foreground" : "text-foreground/85",
                        )}
                      >
                        {stage.name}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block truncate font-mono text-[0.5625rem] tracking-[0.18em] uppercase transition-colors duration-300",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {stage.phase}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1.5">
                        <span
                          aria-hidden
                          className={cn(
                            "h-1 w-1 shrink-0 rounded-full",
                            isActive
                              ? stage.statusTone === "success"
                                ? "bg-success"
                                : "bg-primary"
                              : "bg-border-strong",
                          )}
                        />
                        <span
                          className={cn(
                            "truncate font-mono text-[0.5625rem] tracking-[0.14em] uppercase",
                            isActive ? "text-muted-foreground" : "text-muted-foreground/70",
                          )}
                        >
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
        </div>
      </div>

      {/* Stage detail */}
      <div
        id="stage-detail"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active.id}`}
        tabIndex={0}
        className="mt-5 rounded-2xl border border-border bg-surface/40 p-5 md:p-7"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[0.625rem] tracking-[0.2em] text-primary uppercase">
            Stage {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
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
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
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
  const tone = active ? "text-primary/60" : "text-border-strong";
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-start gap-1 py-1 pl-6 md:justify-center md:pl-0",
        mdDir === "down"
          ? "md:flex-col md:py-2"
          : "md:mt-7 md:flex-row md:self-start md:px-2 md:py-0",
        "lg:mt-7 lg:flex-row lg:self-start lg:px-3 lg:py-0",
        mdDir === "left" && "md:flex-row-reverse lg:flex-row",
        tone,
        className,
      )}
    >
      <span
        className={cn(
          "block h-5 w-px shrink-0 bg-current opacity-60",
          mdDir === "down" ? "md:h-5 md:w-px" : "md:h-px md:w-6 md:min-w-6",
          "lg:h-px lg:w-full lg:min-w-8",
        )}
      />
      <ChevronDown
        className={cn(
          "h-3 w-3 shrink-0 opacity-80",
          mdDir === "right" && "md:-rotate-90",
          mdDir === "left" && "md:rotate-90",
          "lg:-rotate-90",
        )}
      />
    </span>
  );
}
