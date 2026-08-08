import { defineTool } from "@lovable.dev/mcp-js";
import { PILLARS } from "../content";

export default defineTool({
  name: "list_capabilities",
  title: "List engineering capabilities",
  description:
    "List the four engineering capability pillars (Infrastructure, Automation, Delivery, Reliability) with a one-line summary and the technologies used in each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PILLARS, null, 2) }],
    structuredContent: { capabilities: PILLARS },
  }),
});
