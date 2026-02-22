"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface VisitorQuizProps {
    reason: string;
    onComplete: (data: { success: boolean; result: string }) => void;
}

export function VisitorQuizCard({ reason, onComplete }: VisitorQuizProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    // Form State
    const [duration, setDuration] = useState("");
    const [partySize, setPartySize] = useState("");
    const [interests, setInterests] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Step 1: Tell the Server Action (which talks to Drizzle) to save these details
            const contentString = `Trip detail: Visiting for ${duration || 'an unknown time'} with ${partySize || 'unknown party'}. Interests: ${interests || 'None specified'}.`;

            const response = await fetch("/api/memory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: contentString }),
            });

            if (!response.ok) {
                throw new Error("Failed to save memory");
            }

            // Step 2: Inform the AI stream that the tool is finished
            setIsDone(true);
            onComplete({ success: true, result: contentString });
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
            onComplete({ success: false, result: "Failed to save profile." });
        }
    };

    if (isDone) {
        return (
            <Card className="w-full max-w-smborder-blue-100 bg-blue-50/30">
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    <CardTitle className="text-base text-blue-900">Preferences Saved</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-blue-700">
                        Thanks! I'll remember this for our conversation.
                    </CardDescription>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md border-2 border-blue-500/20 shadow-md">
            <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-5 h-5 text-blue-500" />
                    <CardTitle className="text-lg">Quick Setup</CardTitle>
                </div>
                <CardDescription>{reason}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="duration">How long are you visiting?</Label>
                        <Input
                            id="duration"
                            placeholder="e.g. Just the weekend, 7 days..."
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="partySize">Who are you traveling with?</Label>
                        <Input
                            id="partySize"
                            placeholder="e.g. Solo, traveling with two kids..."
                            value={partySize}
                            onChange={(e) => setPartySize(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="interests">Any dietary needs or interests?</Label>
                        <Textarea
                            id="interests"
                            placeholder="e.g. Looking for vegan food, want to surf..."
                            className="resize-none"
                            rows={2}
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Preferences"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
