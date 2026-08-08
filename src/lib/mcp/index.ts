import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listCapabilitiesTool from "./tools/list-capabilities";
import getEngineeringPrinciplesTool from "./tools/get-engineering-principles";

export default defineMcp({
  name: "foundation-first",
  title: "Foundation First",
  version: "0.1.0",
  instructions:
    "Public tools for Vikram Madhyasta's Cloud & DevOps engineering portfolio. Use `get_profile` for the professional summary, `list_capabilities` for the engineering capability pillars and technologies, and `get_engineering_principles` for the engineering principles and AI-assisted workflow.",
  tools: [getProfileTool, listCapabilitiesTool, getEngineeringPrinciplesTool],
});
