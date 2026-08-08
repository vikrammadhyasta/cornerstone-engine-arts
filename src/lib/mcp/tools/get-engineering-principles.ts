import { defineTool } from "@lovable.dev/mcp-js";
import { AI_WORKFLOW, PRINCIPLES } from "../content";

export default defineTool({
  name: "get_engineering_principles",
  title: "Get engineering principles",
  description:
    "Get the engineering principles that guide this work, plus a short note on the AI-assisted development workflow.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({ principles: PRINCIPLES, aiWorkflow: AI_WORKFLOW }, null, 2),
      },
    ],
    structuredContent: { principles: PRINCIPLES, aiWorkflow: AI_WORKFLOW },
  }),
});
