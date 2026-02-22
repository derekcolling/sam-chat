import { tool } from "ai";
import { z } from "zod";
import type { Session } from "next-auth";
import { saveUserProfile } from "@/lib/db/queries";

interface SaveUserProfileProps {
    session: Session | null;
}

export const saveUserProfileTool = ({ session }: SaveUserProfileProps) =>
    tool({
        description: "Save a user preference, plan, or date to their memory profile.",
        inputSchema: z.object({
            content: z.string().describe("The specific detail to remember (e.g., 'Loves seafood', 'Leaving on Tuesday'). Keep it concise."),
        }),
        execute: async ({ content }) => {
            if (!session?.user?.id) {
                return {
                    status: "error",
                    message: "User must be authenticated to save memories.",
                };
            }

            try {
                await saveUserProfile({
                    userId: session.user.id,
                    content,
                });

                return {
                    status: "success",
                    message: "Appended to user memory successfully.",
                    savedContent: content,
                };
            } catch (error) {
                console.error("Failed to save user memory:", error);
                return {
                    status: "error",
                    message: "Failed to save memory to database.",
                };
            }
        },
    });
