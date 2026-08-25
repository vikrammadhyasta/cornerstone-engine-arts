import { cn } from "@/lib/utils";
import { stages } from "./data";
import type { ConnRunState, DemoFrame } from "./demo";
import { StageMeta, StageTile } from "./StageTile";

/**
 * Connectors carry the deployment artifact — the primary animation. While
 * the artifact travels a segment, that connector is in its "flow" state and
 * renders the glowing packet at fraction f along its length.
 */
function HConn({ conn }: { conn: ConnRunState }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative h-px flex-1",
        conn.state === "done" && "conn-done",
        conn.state === "flow" && "conn-flow",
        conn.state === "pending" && "conn-pending",
      )}
    >
      {conn.f !== undefined && (
        <span className="artifact-dot" style={{ left: `${conn.f * 100}%` }} />
      )}
    </div>
  );
}

function VConn({ conn, className }: { conn: ConnRunState; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative",
        conn.state === "done" && "conn-done-y",
        conn.state === "flow" && "conn-flow-y",
        conn.state === "pending" && "conn-pending-y",
        className,
      )}
    >
      {conn.f !== undefined && (
        <span className="artifact-dot-y" style={{ top: `${conn.f * 100}%` }} />
      )}
    </div>
  );
}

/* ---------------------------------------------------------- */
/* Desktop (lg+): one horizontal rail, six dominant stations.  */
/* ---------------------------------------------------------- */
function DesktopRail({ frame }: { frame: DemoFrame }) {
  return (
    <div className="relative hidden lg:block">
      <ol className="relative grid grid-cols-6">
        {stages.map((s, i) => (
          <li key={s.id} className="flex flex-col items-center px-1">
            <div className="flex w-full items-center">
              {i === 0 ? (
                <div className="flex-1" />
              ) : (
                <HConn conn={frame.conns[i - 1]!} />
              )}
              <StageTile stage={s} run={frame.stages[i]!} size="lg" />
              {i === stages.length - 1 ? (
                <div className="flex-1" />
              ) : (
                <HConn conn={frame.conns[i]!} />
              )}
            </div>
            <div className="mt-5">
              <StageMeta stage={s} run={frame.stages[i]!} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Tablet (md–lg): deliberate serpentine — 3 + 3, flow snakes back. */
/* ---------------------------------------------------------------- */
function SerpentineCell({
  index,
  place,
  frame,
  left,
  right,
  top,
  padTop,
}: {
  index: number;
  place: string;
  frame: DemoFrame;
  left?: ConnRunState | undefined;
  right?: ConnRunState | undefined;
  top?: ConnRunState | undefined;
  padTop?: boolean;
}) {
  const stage = stages[index]!;
  const run = frame.stages[index]!;
  return (
    <li className={cn("flex flex-col items-center px-1", place)}>
      {padTop && (
        <div className="flex h-12 items-stretch justify-center">
          {top && <VConn conn={top} />}
        </div>
      )}
      <div className="flex w-full items-center">
        {left ? <HConn conn={left} /> : <div className="flex-1" />}
        <StageTile stage={stage} run={run} size="md" />
        {right ? <HConn conn={right} /> : <div className="flex-1" />}
      </div>
      <div className="mt-5">
        <StageMeta stage={stage} run={run} />
      </div>
    </li>
  );
}

function TabletRail({ frame }: { frame: DemoFrame }) {
  const c = frame.conns;
  return (
    <ol className="relative hidden md:grid md:grid-cols-3 lg:hidden">
      {/* Row 1 — left to right */}
      <SerpentineCell index={0} place="col-start-1 row-start-1" frame={frame} right={c[0]} />
      <SerpentineCell
        index={1}
        place="col-start-2 row-start-1"
        frame={frame}
        left={c[0]}
        right={c[1]}
      />
      <SerpentineCell index={2} place="col-start-3 row-start-1" frame={frame} left={c[1]} />
      {/* Row 2 — serpentine return, right to left */}
      <SerpentineCell
        index={3}
        place="col-start-3 row-start-2"
        frame={frame}
        top={c[2]}
        left={c[3]}
        padTop
      />
      <SerpentineCell
        index={4}
        place="col-start-2 row-start-2"
        frame={frame}
        left={c[4]}
        right={c[3]}
        padTop
      />
      <SerpentineCell
        index={5}
        place="col-start-1 row-start-2"
        frame={frame}
        right={c[4]}
        padTop
      />
    </ol>
  );
}

/* ------------------------------------------------------------- */
/* Mobile (<md): vertical rail — never six squeezed in a row.     */
/* ------------------------------------------------------------- */
function MobileRail({ frame }: { frame: DemoFrame }) {
  return (
    <ol className="relative md:hidden">
      {stages.map((s, i) => {
        const run = frame.stages[i]!;
        return (
          <li key={s.id} className="relative flex gap-5 pb-9 last:pb-0">
            <div className="relative">
              <StageTile stage={s} run={run} size="sm" />
              {i < stages.length - 1 && (
                <VConn
                  conn={frame.conns[i]!}
                  className="absolute left-1/2 top-full h-9 -translate-x-1/2"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <StageMeta stage={s} run={run} align="left" />
              {s.id === "jenkins" && run.status === "failed" && (
                <a
                  href="#diagnostics"
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded border border-fail/25 bg-fail/10 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-fail/90"
                >
                  ✕ build #248 failed → diagnostics
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function PipelineRail({ frame }: { frame: DemoFrame }) {
  return (
    <>
      <DesktopRail frame={frame} />
      <TabletRail frame={frame} />
      <MobileRail frame={frame} />
    </>
  );
}
