import * as React from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ApiGatewayBrandMark,
  ClientMark,
  LambdaBrandMark,
  S3BrandMark,
} from "@/components/site/cloudml/brand-marks";

/**
 * Serverless request architecture for the Cloud ML Agriculture Predictor.
 * Deterministic 7-phase loop: the request travels Client -> API Gateway ->
 * Lambda -> S3 (model artifact) -> Lambda inference -> API Gateway -> Client.
 * Layout is flex/grid based (no absolute coordinates), so connectors always
 * stay attached to their endpoints at every breakpoint.
 */

type NodeId = "client" | "apigw" | "lambda" | "s3";

interface Phase {
  /** Connector index carrying traffic (0: client-apigw, 1: apigw-lambda, 2: lambda-s3) */
  link: 0 | 1 | 2 | null;
  /** Travel direction along that connector */
  dir: "forward" | "back";
  /** Node doing work in this phase */
  active: NodeId;
  label: string;
  detail: string;
}

const PHASES: Phase[] = [
  {
    link: 0,
    dir: "forward",
    active: "client",
    label: "POST /predict",
    detail: "Client sends crop feature payload as JSON over HTTPS.",
  },
  {
    link: 1,
    dir: "forward",
    active: "apigw",
    label: "Route & invoke",
    detail: "API Gateway validates the route and invokes the Lambda function.",
  },
  {
    link: 2,
    dir: "forward",
    active: "lambda",
    label: "Fetch model artifact",
    detail: "Lambda reads the JSON coefficient artifact from S3 using its least-privilege role.",
  },
  {
    link: 2,
    dir: "back",
    active: "s3",
    label: "Artifact returned",
    detail: "S3 returns the <1 MB coefficient file; it is cached for the container lifetime.",
  },
  {
    link: null,
    dir: "forward",
    active: "lambda",
    label: "Pure Python inference",
    detail: "Prediction computed with plain arithmetic over the coefficients — no sklearn runtime.",
  },
  {
    link: 1,
    dir: "back",
    active: "lambda",
    label: "Prediction payload",
    detail: "Lambda returns the predicted yield with a 200 status to API Gateway.",
  },
  {
    link: 0,
    dir: "back",
    active: "apigw",
    label: "200 OK",
    detail: "API Gateway returns the JSON prediction response to the client.",
  },
];

const PHASE_MS = 1900;

const NODES: {
  id: NodeId;
  name: string;
  kind: string;
  note: string;
  mark: React.ReactNode;
}[] = [
  {
    id: "client",
    name: "Client",
    kind: "Caller",
    note: "HTTPS request",
    mark: <ClientMark />,
  },
  {
    id: "apigw",
    name: "API Gateway",
    kind: "AWS · Edge",
    note: "REST route",
    mark: <ApiGatewayBrandMark />,
  },
  {
    id: "lambda",
    name: "Lambda",
    kind: "AWS · Compute",
    note: "Inference handler",
    mark: <LambdaBrandMark />,
  },
  {
    id: "s3",
    name: "S3",
    kind: "AWS · Storage",
    note: "Model artifact",
    mark: <S3BrandMark />,
  },
];


function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function Connector({
  index,
  phase,
  labelForward,
  labelBack,
  animate,
}: {
  index: 0 | 1 | 2;
  phase: Phase;
  labelForward: string;
  labelBack: string;
  animate: boolean;
}) {
  const live = phase.link === index;
  const back = live && phase.dir === "back";
  return (
    <div className="flex shrink-0 items-center justify-center lg:flex-1">
      <div className="flex w-full flex-col items-center gap-1.5 py-2 lg:py-0">
        <span
          className={cn(
            "font-mono text-[0.5625rem] tracking-[0.14em] uppercase transition-colors duration-300",
            live ? "text-primary" : "text-muted-foreground/60",
          )}
        >
          {back ? labelBack : labelForward}
        </span>

        {/* vertical track on small screens, horizontal from lg */}
        <div
          aria-hidden
          className={cn(
            "relative h-10 w-px overflow-hidden rounded-full bg-border-strong/70 lg:h-px lg:w-full",
            live && "bg-primary/45",
          )}
        >
          {live && animate && (
            <span
              className={cn(
                "absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary lg:top-1/2 lg:-translate-y-1/2",
                back ? "animate-flow-up lg:animate-flow-left" : "animate-flow-down lg:animate-flow-right",
              )}
              style={{ animationDuration: `${PHASE_MS}ms` }}
            />
          )}
          {live && !animate && (
            <span className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
          )}
        </div>

        <span aria-hidden className={cn("font-mono text-xs leading-none", live ? "text-primary" : "text-border-strong")}>
          <span className="lg:hidden">{back ? "↑" : "↓"}</span>
          <span className="hidden lg:inline">{back ? "←" : "→"}</span>
        </span>
      </div>
    </div>
  );
}

export function ServerlessArchitecture() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = React.useState(true);
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (reduced || !playing) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % PHASES.length), PHASE_MS);
    return () => window.clearInterval(id);
  }, [reduced, playing]);

  const phase = PHASES[reduced ? 2 : step]!;
  const animate = !reduced && playing;

  return (
    <div
      className="surface-panel p-5 sm:p-7"
      role="group"
      aria-label="Serverless request architecture: client to API Gateway to Lambda, which loads the model artifact from S3, runs inference and returns the prediction response back through API Gateway to the client. IAM governs access and CloudWatch collects logs, request counts and latency."
    >
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          Request path — POST /predict
        </p>
        {!reduced && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
          >
            {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
            {playing ? "Pause animation" : "Play animation"}
          </Button>
        )}
      </div>

      {/* request path */}
      <div className="mt-6 flex flex-col items-stretch lg:flex-row lg:items-center">
        {NODES.map((node, i) => (
          <React.Fragment key={node.id}>
            {i > 0 && (
              <Connector
                index={(i - 1) as 0 | 1 | 2}
                phase={phase}
                animate={animate}
                labelForward={["request", "invoke", "get object"][i - 1]!}
                labelBack={["response", "payload", "artifact"][i - 1]!}
              />
            )}
            <div
              className={cn(
                "relative flex items-center gap-3 rounded-xl border p-4 transition-colors duration-300 lg:w-44 lg:shrink-0 lg:flex-col lg:items-start",
                phase.active === node.id
                  ? "border-primary/55 bg-primary/8"
                  : "border-border bg-surface/50",
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-lg border transition-colors duration-300",
                  phase.active === node.id
                    ? "border-primary/50 bg-primary/12 text-primary"
                    : "border-border bg-surface text-muted-foreground",
                )}
                aria-hidden
              >
                <span className="h-5 w-5 [&>svg]:h-5 [&>svg]:w-5">{node.mark}</span>
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground">{node.name}</span>
                <span className="block font-mono text-[0.5625rem] tracking-[0.14em] text-primary/90 uppercase">
                  {node.kind}
                </span>
                <span className="mt-0.5 block text-[0.6875rem] text-muted-foreground">
                  {node.note}
                </span>
              </span>
              {phase.active === node.id && (
                <span className="absolute top-3 right-3 font-mono text-[0.5625rem] tracking-[0.14em] text-primary uppercase">
                  active
                </span>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* phase caption — live region so the animation is not colour-only */}
      <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border border-border bg-surface/40 px-4 py-3">
        <span className="font-mono text-[0.625rem] tracking-[0.16em] text-primary uppercase">
          {reduced ? "Step 3 of 7" : `Step ${step + 1} of ${PHASES.length}`} · {phase.label}
        </span>
        <span className="text-sm text-muted-foreground">{phase.detail}</span>
      </p>

      {/* control & observability planes */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-dashed border-border-strong/70 bg-surface/30 p-4">
          <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
            Control plane — not in the request path
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">IAM</p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
            Least-privilege execution role: read-only access to the single model-artifact object in
            S3, plus log writes. Governs Lambda, never handles traffic.
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-border-strong/70 bg-surface/30 p-4">
          <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
            Observability plane — taps API Gateway &amp; Lambda
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">CloudWatch</p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
            Execution logs from every invocation, request counts from API Gateway, and end-to-end
            latency for each prediction.
          </p>
        </div>
      </div>
    </div>
  );
}
