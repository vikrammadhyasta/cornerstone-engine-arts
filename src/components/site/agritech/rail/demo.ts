import { logLines } from "./data";

/**
 * Deterministic demo timeline. Every animated visual on the page is a pure
 * function of (mode, t) — no randomness, no backend, no hidden state. The
 * clock in use-demo-clock.ts supplies t; this module maps it to a frame.
 */

export type RunMode = "success" | "failure";
export type RunStatus = "pending" | "active" | "completed" | "failed";

export interface StageRunState {
  status: RunStatus;
  meta: string;
  /** 0..1 while a stage works; frozen value when failed; null otherwise. */
  progress: number | null;
}

export interface ConnRunState {
  state: "done" | "flow" | "pending";
  /** Artifact position along this connector (0..1) — set only while travelling. */
  f?: number;
}

export type DiagPhase = "dormant" | "capture" | "logs" | "analysis" | "result";

export interface DiagFrame {
  active: boolean;
  phase: DiagPhase;
  revealedLogs: number;
  analysisProgress: number;
  showRootCause: boolean;
  showFix: boolean;
  showChips: boolean;
  chipLabel: string;
}

export interface DemoFrame {
  stages: StageRunState[];
  conns: ConnRunState[];
  runLabel: string;
  diag: DiagFrame;
}

/* ------------------------------------------------------------------ */
/* Success run — build #249                                            */
/* ------------------------------------------------------------------ */

const ACT = 3000; // per-stage work
const TRAVEL = 1400; // artifact between stations
const HOLD = 2600; // all-green dwell before the loop resets
export const SUCCESS_LOOP = 6 * ACT + 5 * TRAVEL + HOLD;

const PENDING_META = [
  "awaiting push",
  "awaiting trigger",
  "awaiting image",
  "awaiting push",
  "revision queued",
  "rollout queued",
];

const DONE_META = [
  "push a41c9e2",
  "#249 · 2m 41s",
  "image :a41c9e2",
  "digest sha256:9c4e",
  "healthy · synced",
  "3/3 pods ready",
];

function activeMeta(stage: number, f: number): string {
  switch (stage) {
    case 0:
      return f < 0.5 ? "webhook · push a41c9e2" : "checkout main @ a41c9e2";
    case 1: {
      const steps = ["checkout", "lint", "unit tests", "build image", "push to ECR"];
      return `#249 · ${steps[Math.min(steps.length - 1, Math.floor(f * steps.length))]}`;
    }
    case 2:
      return `layer ${Math.min(12, 1 + Math.floor(f * 12))} of 12`;
    case 3:
      return `push ${Math.min(9, 1 + Math.floor(f * 9))}/9 blobs`;
    case 4:
      return ["diff detected", "syncing manifests", "health check"][
        Math.min(2, Math.floor(f * 3))
      ]!;
    default:
      return `pods ${Math.min(3, Math.floor(f * 3.999))}/3 ready`;
  }
}

const DORMANT_DIAG: DiagFrame = {
  active: false,
  phase: "dormant",
  revealedLogs: 0,
  analysisProgress: 0,
  showRootCause: false,
  showFix: false,
  showChips: false,
  chipLabel: "NO INCIDENTS · STANDBY",
};

function successFrame(t: number): DemoFrame {
  const stages: StageRunState[] = [];
  for (let i = 0; i < 6; i++) {
    const start = i * (ACT + TRAVEL);
    if (t < start) {
      stages.push({ status: "pending", meta: PENDING_META[i]!, progress: null });
    } else if (t < start + ACT) {
      const f = (t - start) / ACT;
      stages.push({ status: "active", meta: activeMeta(i, f), progress: f });
    } else {
      stages.push({ status: "completed", meta: DONE_META[i]!, progress: null });
    }
  }

  const conns: ConnRunState[] = [];
  for (let i = 0; i < 5; i++) {
    const depart = i * (ACT + TRAVEL) + ACT;
    if (t >= depart && t < depart + TRAVEL) {
      conns.push({ state: "flow", f: (t - depart) / TRAVEL });
    } else {
      conns.push({ state: t >= depart + TRAVEL ? "done" : "pending" });
    }
  }

  const deployed = t >= 5 * (ACT + TRAVEL) + ACT;
  return {
    stages,
    conns,
    runLabel: deployed ? "RUN #249 · DEPLOYED ✓" : "RUN #249 · DEPLOYING",
    diag: DORMANT_DIAG,
  };
}

/* ------------------------------------------------------------------ */
/* Failure run — build #248, routed to diagnostics                     */
/* ------------------------------------------------------------------ */

const F_GIT = 2500;
const F_TRAVEL = 1400;
const F_BUILD = 4300; // Jenkins works, then fails at ~65%
const JENKINS_STALL = 0.65;
const T_FAIL = F_GIT + F_TRAVEL + F_BUILD;
const T_LOGS = T_FAIL + 500;
const LOG_STEP = 480;
const T_ANALYZE = T_LOGS + logLines.length * LOG_STEP + 600;
const T_PROGRESS = T_ANALYZE + 1200;
const PROGRESS_DUR = 1500;
const T_CAUSE = T_PROGRESS + PROGRESS_DUR;
const T_FIX = T_CAUSE + 500;
const T_CHIPS = T_FIX + 500;
export const FAILURE_LOOP = T_CHIPS + 4200;

const JENKINS_STEPS = ["checkout", "lint", "unit tests", "build image", "push to ECR"];

function failureFrame(t: number): DemoFrame {
  const jenkinsStart = F_GIT + F_TRAVEL;
  const buildF = Math.max(0, Math.min(1, (t - jenkinsStart) / F_BUILD));

  const stages: StageRunState[] = [
    t < F_GIT
      ? { status: "active", meta: activeMeta(0, t / F_GIT), progress: t / F_GIT }
      : { status: "completed", meta: "push a41c9e2", progress: null },
    t < jenkinsStart
      ? { status: "pending", meta: "awaiting trigger", progress: null }
      : t < T_FAIL
        ? {
            status: "active",
            meta: `#248 · ${
              JENKINS_STEPS[
                Math.min(JENKINS_STEPS.length - 1, Math.floor(buildF * 1.4 * JENKINS_STEPS.length))
              ]
            }`,
            progress: buildF * JENKINS_STALL,
          }
        : { status: "failed", meta: "#248 · failed · exit 1", progress: JENKINS_STALL },
    { status: "pending", meta: "awaiting image", progress: null },
    { status: "pending", meta: "awaiting push", progress: null },
    { status: "pending", meta: "revision queued", progress: null },
    { status: "pending", meta: "rollout queued", progress: null },
  ];

  const conns: ConnRunState[] = [
    t >= F_GIT && t < jenkinsStart
      ? { state: "flow", f: (t - F_GIT) / F_TRAVEL }
      : { state: t >= jenkinsStart ? "done" : "pending" },
    { state: "pending" },
    { state: "pending" },
    { state: "pending" },
    { state: "pending" },
  ];

  const phase: DiagPhase =
    t < T_FAIL
      ? "dormant"
      : t < T_LOGS
        ? "capture"
        : t < T_ANALYZE
          ? "logs"
          : t < T_CAUSE
            ? "analysis"
            : "result";

  const diag: DiagFrame = {
    active: t >= T_FAIL,
    phase,
    revealedLogs:
      t < T_LOGS
        ? 0
        : Math.min(logLines.length, 1 + Math.floor((t - T_LOGS) / LOG_STEP)),
    analysisProgress: Math.max(0, Math.min(1, (t - T_PROGRESS) / PROGRESS_DUR)),
    showRootCause: t >= T_CAUSE,
    showFix: t >= T_FIX,
    showChips: t >= T_CHIPS,
    chipLabel:
      phase === "dormant"
        ? "NO INCIDENTS · STANDBY"
        : phase === "capture"
          ? "INCIDENT #248 · ROUTED"
          : phase === "logs"
            ? "INCIDENT #248 · CAPTURING LOGS"
            : phase === "analysis"
              ? "INCIDENT #248 · ANALYZING"
              : "INCIDENT #248 · AUTO-TRIAGED",
  };

  return {
    stages,
    conns,
    runLabel:
      t < T_FAIL
        ? "RUN #248 · BUILDING"
        : t < T_CAUSE
          ? "INCIDENT #248 · TRIAGING"
          : "INCIDENT #248 · TRIAGED",
    diag,
  };
}

export function frameAt(mode: RunMode, t: number): DemoFrame {
  return mode === "success" ? successFrame(t) : failureFrame(t);
}

/** Frozen snapshot for prefers-reduced-motion — the original static design. */
export const STATIC_FRAME: DemoFrame = {
  stages: [
    { status: "completed", meta: "push a41c9e2", progress: null },
    { status: "completed", meta: "#247 · 2m 41s", progress: null },
    { status: "active", meta: "layer 7 of 12", progress: 7 / 12 },
    { status: "pending", meta: "awaiting push", progress: null },
    { status: "pending", meta: "revision queued", progress: null },
    { status: "pending", meta: "rollout queued", progress: null },
  ],
  conns: [
    { state: "done" },
    { state: "done" },
    { state: "flow" },
    { state: "pending" },
    { state: "pending" },
  ],
  runLabel: "RUN #247 · DEPLOYING",
  diag: {
    active: true,
    phase: "result",
    revealedLogs: logLines.length,
    analysisProgress: 1,
    showRootCause: true,
    showFix: true,
    showChips: true,
    chipLabel: "INCIDENT #248 · AUTO-TRIAGED",
  },
};
