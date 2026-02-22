import { tool } from "ai";
import { z } from "zod";

// Client-side tool: no `execute`. The AI pauses and waits for the client
// to call `addToolResult` after the user submits the quiz form.
export const askVisitorQuizTool = tool({
    description: "Display an interactive quiz card to the user so they can fill out their travel preferences and save them to memory.",
    inputSchema: z.object({
        reason: z.string().describe("Why you are asking the user to fill out the questionnaire (e.g. 'I see you are new here! Let\\'s get some quick details so I can give you the best recommendations.')"),
    }),
});
