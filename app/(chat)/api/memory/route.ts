import { auth } from "@/app/(auth)/auth";
import { saveUserProfile } from "@/lib/db/queries";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return new Response("Unauthorized", { status: 401 });
        }

        const { content } = await req.json();

        if (!content || typeof content !== "string") {
            return new Response("Invalid request payload", { status: 400 });
        }

        await saveUserProfile({
            userId: session.user.id,
            content,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("[Memory API] Error saving profile:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
