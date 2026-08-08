import { defineTool } from "@lovable.dev/mcp-js";
import { PROFILE } from "../content";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get the public professional profile summary for this portfolio: name, focus areas, availability, education and headline.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PROFILE, null, 2) }],
    structuredContent: { profile: PROFILE },
  }),
});
