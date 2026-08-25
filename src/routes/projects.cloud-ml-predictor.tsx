import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Section, SectionLabel } from "@/components/site/section";
import { PanelCard, CardEyebrow, CardTitle, CardBody } from "@/components/site/panel-card";
import { ServerlessArchitecture } from "@/components/site/cloudml/serverless-architecture";
import { AwsMark, PythonMark } from "@/components/site/tech-marks";

const TITLE = "Cloud ML Agriculture Predictor | Vikram Madhyasta";
const DESCRIPTION =
  "Engineering case study: a fully serverless crop-yield prediction API on AWS — API Gateway, Lambda and S3, with a sub-1 MB pure-Python inference package.";

export const Route = createFileRoute("/projects/cloud-ml-predictor")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CloudMlPredictor,
});

const BADGES = [
  "AWS S3",
  "AWS Lambda",
  "API Gateway",
  "CloudWatch",
  "IAM",
  "Python",
  "Scikit-learn",
];

const METRICS = [
  { value: "<1 MB", label: "Deployment package", note: "Down from a 50 MB+ sklearn bundle" },
  { value: "0", label: "EC2 instances", note: "No always-on compute to operate" },
  { value: "1", label: "REST endpoint", note: "POST /predict" },
  { value: "0", label: "Idle infrastructure cost", note: "Billed only per invocation" },
];

const WHY = [
  {
    title: "API Gateway as the only entry point",
    body: "The predictor needs one HTTP contract, not a web server. API Gateway terminates TLS, owns the POST /predict route, and invokes the function — so there is no framework, port or process to keep alive.",
  },
  {
    title: "Lambda instead of a hosted service",
    body: "Prediction is a short, stateless, arithmetic-bound call. Request-scoped compute matches that shape exactly: it scales from zero, and nothing runs between requests.",
  },
  {
    title: "S3 as the model store",
    body: "Keeping the model artifact outside the deployment package means the model can be replaced without redeploying the function, and the function code stays tiny and versioned independently.",
  },
  {
    title: "IAM as the boundary, not a gateway",
    body: "The Lambda execution role is scoped to reading the single model object and writing its own logs. Access is enforced by the platform rather than by credentials shipped inside the code.",
  },
];

const OPTIMIZATION = [
  {
    step: "01",
    title: "Scikit-learn trained model",
    body: "The regression model is trained offline with scikit-learn on the agriculture dataset.",
    tone: "neutral" as const,
  },
  {
    step: "02",
    title: "Problem — large deployment package",
    body: "Bundling scikit-learn and its numeric dependencies pushes the Lambda artifact past 50 MB, colliding with Lambda deployment-size limits and slowing cold starts.",
    tone: "problem" as const,
  },
  {
    step: "03",
    title: "Extract trained coefficients",
    body: "Training output is reduced to what inference actually needs: the learned coefficients and intercept.",
    tone: "neutral" as const,
  },
  {
    step: "04",
    title: "Lightweight JSON artifact",
    body: "Those parameters are serialized to a small JSON file and stored in S3, versioned separately from the function.",
    tone: "neutral" as const,
  },
  {
    step: "05",
    title: "Pure Python inference",
    body: "The handler computes the prediction with plain arithmetic over the coefficients — no scientific stack at runtime.",
    tone: "neutral" as const,
  },
  {
    step: "06",
    title: "Under 1 MB deployment package",
    body: "The function ships as a handful of Python files, well inside Lambda limits, with a faster cold start.",
    tone: "result" as const,
  },
];

const SECURITY = [
  {
    title: "Least-privilege IAM role",
    body: "The execution role grants read access to the model artifact in S3 and permission to write its own log stream — nothing else. No wildcard bucket access, no long-lived keys in code.",
  },
  {
    title: "S3 to Lambda access",
    body: "The bucket is private; retrieval happens through the function's role rather than public object URLs, so the artifact is never exposed on the internet.",
  },
];

const OBSERVABILITY = [
  { term: "Execution logs", value: "Every invocation writes structured logs to CloudWatch, including input validation failures and artifact-load errors." },
  { term: "Request counts", value: "API Gateway metrics in CloudWatch show call volume per endpoint and status-code distribution." },
  { term: "Latency", value: "Invocation duration is tracked so cold-start and inference time can be separated and compared over time." },
];

const CHALLENGES = [
  {
    problem: "Lambda deployment-size constraints caused by scikit-learn dependencies.",
    investigation:
      "Packaging the trained model with scikit-learn and its numeric dependencies produced an artifact well over 50 MB. Inspecting the bundle showed almost all of the weight came from libraries used only during training, while inference touched a fraction of one estimator.",
    solution:
      "Serialized the trained coefficients and intercept into a small JSON artifact stored in S3, and reimplemented the prediction step in pure Python arithmetic so the runtime needs no scientific stack.",
    result:
      "The deployment package dropped below 1 MB, fitting comfortably inside Lambda limits, with a lighter cold start and a model that can be swapped without redeploying code.",
  },
  {
    problem: "Reloading the model artifact on every request added avoidable latency.",
    investigation:
      "CloudWatch duration metrics showed each invocation paying for an S3 read even when the same container handled consecutive requests.",
    solution:
      "Loaded the artifact once at module scope and reused it across invocations served by a warm container, keeping the cold path as the only read.",
    result: "Warm invocations skip the S3 round trip, and the artifact stays authoritative in S3.",
  },
  {
    problem: "Malformed request bodies surfaced as opaque 502s from API Gateway.",
    investigation:
      "Execution logs showed unhandled exceptions inside the handler being translated into gateway-level errors, which hid the actual cause from the caller.",
    solution:
      "Validated the feature payload inside the handler and returned explicit client-error responses with a readable message instead of letting the function raise.",
    result: "Callers get an actionable error, and genuine faults remain distinguishable in the logs.",
  },
];

const STACK = [
  { name: "API Gateway", role: "REST entry point for POST /predict" },
  { name: "AWS Lambda", role: "Request-scoped inference handler" },
  { name: "AWS S3", role: "Versioned JSON model artifact" },
  { name: "CloudWatch", role: "Logs, request counts and latency" },
  { name: "IAM", role: "Least-privilege execution role" },
  { name: "Python", role: "Handler and pure-arithmetic inference" },
  { name: "Scikit-learn", role: "Offline model training" },
];

const OUTCOMES = [
  { title: "Serverless architecture", body: "API Gateway, Lambda and S3 only — nothing to patch, scale or keep running between requests." },
  { title: "REST prediction API", body: "A single POST /predict contract returning a crop-yield prediction as JSON." },
  { title: "Lightweight inference", body: "Coefficient-based arithmetic in pure Python keeps the runtime dependency-free." },
  { title: "No EC2", body: "No instances, no operating system, no capacity planning for a bursty, low-volume workload." },
  { title: "Zero idle infrastructure cost", body: "The design is built to sit inside the AWS Free Tier envelope: with no always-on components, an idle system costs nothing to keep available." },
  { title: "Centralized monitoring", body: "Execution logs, request counts and latency all land in CloudWatch as one place to look." },
];

const FREE_TIER = [
  "Serverless",
  "No EC2",
  "No always-on infrastructure",
  "Zero idle infrastructure cost",
  "AWS Free Tier oriented",
];

function CloudMlPredictor() {
  return (
    <div id="top">
      {/* 1. Project hero */}
      <section className="pt-24 pb-20 md:pt-28 md:pb-24 xl:pt-32 xl:pb-28">
        <div className="container-page">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div className="flex max-w-3xl flex-col gap-5 animate-reveal">
              <SectionLabel>Case study 02 — Cloud / Serverless ML</SectionLabel>
              <h1 className="text-gradient-heading font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
                Cloud ML Agriculture Predictor
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                A fully serverless ML prediction system on AWS that exposes crop-yield predictions
                through a REST API without dedicated compute infrastructure. The trained model is
                reduced to a coefficient artifact in S3 and served by a Lambda function behind API
                Gateway, so the deployment package stays under 1 MB and nothing runs while the
                system is idle.
              </p>

              <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                {BADGES.map((label) => {
                  const Icon = label === "Python" || label === "Scikit-learn" ? PythonMark : AwsMark;
                  return (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      {label}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                  Endpoint — POST /predict
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 animate-reveal">
              {METRICS.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border bg-surface/40 p-4">
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold text-foreground">
                      {metric.value}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-foreground/80">
                      {metric.label}
                    </span>
                    <span className="mt-0.5 block text-[0.6875rem] text-muted-foreground">
                      {metric.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 2. Architecture visualization */}
      <Section
        bordered
        id="architecture"
        label="Architecture"
        heading="A request, end to end"
        description="One prediction call travelling the serverless path: client to API Gateway, invoke Lambda, load the model artifact from S3, run inference, and return the response back through the gateway. IAM sits beside the path as the control plane; CloudWatch taps it as the observability plane."
      >
        <ServerlessArchitecture />
      </Section>

      {/* 3. Serverless architecture explanation */}
      <Section
        bordered
        label="Serverless design"
        heading="Why Lambda, API Gateway and S3"
        description="Each service was chosen for the shape of this workload: short, stateless, bursty prediction calls with a small model."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {WHY.map((item) => (
            <PanelCard key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardBody className="mt-3">{item.body}</CardBody>
            </PanelCard>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <PanelCard interactive={false}>
            <CardEyebrow>API contract</CardEyebrow>
            <CardTitle className="mt-3 font-mono text-base">POST /predict</CardTitle>
            <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
              {["Request", "API Gateway", "Lambda", "Inference", "Prediction response"].map(
                (step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="font-mono text-xs text-border-strong">
                        &rarr;
                      </span>
                    )}
                    <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                      {step}
                    </span>
                  </li>
                ),
              )}
            </ol>
            <CardBody className="mt-4">
              The caller posts crop feature values as JSON. API Gateway routes the call to Lambda,
              the handler computes the prediction from the coefficient artifact, and the predicted
              yield is returned as a JSON response with a standard HTTP status.
            </CardBody>
          </PanelCard>

          <PanelCard interactive={false}>
            <CardEyebrow>Cost & footprint</CardEyebrow>
            <CardTitle className="mt-3">Free Tier oriented design</CardTitle>
            <ul className="mt-4 space-y-2">
              {FREE_TIER.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <CardBody className="mt-4 text-[0.8125rem]">
              This describes how this project is designed — every component is request-scoped or
              storage-only, so an idle system has nothing to bill.
            </CardBody>
          </PanelCard>
        </div>
      </Section>

      {/* 4. ML deployment optimization */}
      <Section
        bordered
        label="ML deployment optimization"
        heading="From a 50 MB+ bundle to under 1 MB"
        description="The interesting engineering here is not the model — it is what had to be removed so the model could run inside a Lambda function."
      >
        <div className="surface-panel p-5 sm:p-7">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {OPTIMIZATION.map((item, i) => (
              <div
                key={item.step}
                className={
                  "relative rounded-xl border p-5 " +
                  (item.tone === "problem"
                    ? "border-warning/50 bg-warning/8"
                    : item.tone === "result"
                      ? "border-success/50 bg-success/8"
                      : "border-border bg-surface/50")
                }
              >
                <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                  Step {item.step}
                  {item.tone === "problem" && " · constraint"}
                  {item.tone === "result" && " · result"}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                {i < OPTIMIZATION.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-xs text-border-strong md:hidden"
                  >
                    ↓
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface/40 p-5">
              <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                Before
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-foreground">50 MB+</p>
              <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                Function bundled with scikit-learn and its numeric dependencies.
              </p>
              <div aria-hidden className="mt-4 h-1.5 w-full rounded-full bg-warning/60" />
            </div>
            <div className="rounded-xl border border-success/45 bg-success/8 p-5">
              <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                After
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-foreground">&lt; 1 MB</p>
              <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                Coefficient JSON in S3 plus a pure-Python handler.
              </p>
              <div aria-hidden className="mt-4 h-1.5 w-full rounded-full bg-surface">
                <div className="h-full w-[2%] rounded-full bg-success" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Security & observability */}
      <Section
        bordered
        label="Security & observability"
        heading="Scoped access, and a single place to look"
        description="Access is granted by role, and every invocation is measurable."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-6">
            {SECURITY.map((item) => (
              <PanelCard key={item.title}>
                <CardEyebrow>IAM</CardEyebrow>
                <CardTitle className="mt-3">{item.title}</CardTitle>
                <CardBody className="mt-3">{item.body}</CardBody>
              </PanelCard>
            ))}
          </div>
          <PanelCard interactive={false} className="h-full">
            <CardEyebrow>CloudWatch</CardEyebrow>
            <CardTitle className="mt-3">Monitoring</CardTitle>
            <dl className="mt-5 space-y-4">
              {OBSERVABILITY.map((item) => (
                <div key={item.term} className="grid gap-1 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase sm:pt-0.5">
                    {item.term}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </PanelCard>
        </div>
      </Section>

      {/* 6. Engineering challenges */}
      <Section
        bordered
        label="Engineering challenges"
        heading="What actually had to be solved"
        description="Problem → Investigation → Solution → Result."
      >
        <ol className="grid gap-6 lg:grid-cols-2">
          {CHALLENGES.map((item, index) => (
            <li key={item.problem}>
              <PanelCard interactive={false} className="h-full">
                <CardEyebrow>Challenge {String(index + 1).padStart(2, "0")}</CardEyebrow>
                <h3 className="mt-3 text-base leading-snug font-semibold text-foreground">
                  {item.problem}
                </h3>
                <dl className="mt-5 space-y-4">
                  {(
                    [
                      ["Investigation", item.investigation],
                      ["Solution", item.solution],
                      ["Result", item.result],
                    ] as const
                  ).map(([term, value]) => (
                    <div key={term} className="grid gap-1 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
                      <dt className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase sm:pt-0.5">
                        {term}
                      </dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </PanelCard>
            </li>
          ))}
        </ol>
      </Section>

      {/* 7. Technology stack */}
      <Section
        bordered
        label="Stack"
        heading="Technology stack"
        description="Seven components, each with one responsibility in the prediction path."
      >
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {STACK.map((tech) => {
            const Icon = tech.name === "Python" || tech.name === "Scikit-learn" ? PythonMark : AwsMark;
            return (
              <li
                key={tech.name}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface/40 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {tech.name}
                  </span>
                  <span className="block text-[0.6875rem] leading-snug text-muted-foreground">
                    {tech.role}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 8. Outcome */}
      <Section
        bordered
        label="Outcome"
        heading="What the system demonstrates"
        description="A prediction service that is cheap to keep available and small enough to deploy in seconds."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {OUTCOMES.map((outcome) => (
            <PanelCard key={outcome.title}>
              <CardTitle>{outcome.title}</CardTitle>
              <CardBody className="mt-3">{outcome.body}</CardBody>
            </PanelCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
