import { auth } from "@/app/(auth)/auth";
import { getUserProfilesByUserId } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Brain, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function MemoryDashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        return (
            <div className="flex h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle>Unauthorized</CardTitle>
                        <CardDescription>You must be signed in to view your memories.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/" className="text-blue-500 hover:underline">Return Home</Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const profiles = await getUserProfilesByUserId({ userId: session.user.id });

    return (
        <div className="flex flex-col min-h-screen bg-muted/30 p-4 md:p-8">
            <div className="mx-auto w-full max-w-3xl space-y-6">

                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Brain className="w-6 h-6 text-blue-500" />
                        <h1 className="text-2xl font-bold tracking-tight">Memory Dashboard</h1>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Saved Preferences & Context</CardTitle>
                        <CardDescription>These are the details Sam has learned about you across all your conversations. He uses this list to personalize future recommendations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {profiles.length === 0 ? (
                            <div className="p-8 text-center border-2 border-dashed rounded-lg bg-muted/50">
                                <p className="text-muted-foreground">You haven't saved any memories yet.</p>
                                <p className="text-sm text-muted-foreground mt-1">Try telling Sam: "I'm visiting until Tuesday" in the chat!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {profiles.map((profile) => (
                                    <div key={profile.id} className="flex flex-col gap-1 p-4 rounded-lg bg-background border">
                                        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{profile.content}</p>
                                        <span className="text-xs text-muted-foreground">
                                            Learned on {format(new Date(profile.createdAt), 'MMM d, yyyy h:mm a')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
