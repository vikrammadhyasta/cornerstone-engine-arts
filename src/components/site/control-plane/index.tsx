import * as React from "react";

import { Section } from "@/components/site/section";
import { ControlPlaneMap } from "./map";
import { ControlPlaneMobile } from "./mobile";
import { SystemSignals } from "./signals";

function useMedia(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/**
 * "Engineering control plane" — one interactive system view of how AI-assisted
 * engineering, delivery, cloud infrastructure, Kubernetes, GitOps, observability
 * and security relate. Node/edge data lives in `data.ts`.
 */
export function EngineeringControlPlane() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const isDesktop = useMedia("(min-width: 768px)");
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <Section
      bordered
      id="platform"
      className=""
      label="Engineering control plane"
      heading={
        <>
          Engineering systems that think,
          <br className="hidden sm:block" /> ship, and recover.
        </>
      }
      description="AI-assisted engineering, cloud infrastructure, automated delivery, and observability working together as one platform."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-8">
        <div className="min-w-0">
          {isDesktop ? (
            <ControlPlaneMap reduced={reduced} hovered={hovered} onHover={setHovered} />
          ) : (
            <ControlPlaneMobile reduced={reduced} />
          )}

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase">
            {[
              { label: "Engineering flow", dot: "bg-primary" },
              { label: "AI signal", dot: "bg-chart-4" },
              { label: "Observability", dot: "bg-warn" },
              { label: "Feedback", dot: "bg-success" },
            ].map((entry) => (
              <li key={entry.label} className="flex items-center gap-2">
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${entry.dot}`} />
                {entry.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block">
          <SystemSignals reduced={reduced} hovered={hovered} onHover={setHovered} />
        </div>
      </div>
    </Section>
  );
}
