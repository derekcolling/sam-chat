"use client";

import { Calendar, Clock, MapPin, Music, Utensils, Activity, Palette, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CalendarEvent } from "@/lib/ai/tools/get-events";

const CategoryIcon = ({ category }: { category: CalendarEvent["category"] }) => {
    switch (category) {
        case "Music":
            return <Music className="w-4 h-4" />;
        case "Food":
            return <Utensils className="w-4 h-4" />;
        case "Fitness":
            return <Activity className="w-4 h-4" />;
        case "Art":
            return <Palette className="w-4 h-4" />;
        case "Community":
            return <Users className="w-4 h-4" />;
        default:
            return <Calendar className="w-4 h-4" />;
    }
};

const CategoryColor = (category: CalendarEvent["category"]) => {
    switch (category) {
        case "Music":
            return "bg-purple-100 text-purple-700 border-purple-200";
        case "Food":
            return "bg-orange-100 text-orange-700 border-orange-200";
        case "Fitness":
            return "bg-green-100 text-green-700 border-green-200";
        case "Art":
            return "bg-pink-100 text-pink-700 border-pink-200";
        case "Community":
            return "bg-blue-100 text-blue-700 border-blue-200";
        default:
            return "bg-slate-100 text-slate-700 border-slate-200";
    }
};

export function EventsCalendar({ events }: { events: CalendarEvent[] }) {
    if (!events || events.length === 0) {
        return (
            <Card className="w-full bg-slate-50 border-slate-200 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center p-6 text-slate-500">
                    <Calendar className="w-8 h-8 mb-2 opacity-20" />
                    <p>No upcoming events found matching that criteria.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="w-full space-y-3">
            {events.map((event) => (
                <Card key={event.id} className="overflow-hidden bg-white/50 backdrop-blur-md border-white/40 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                        {/* Calendar Date Graphic */}
                        <div className="bg-slate-50 border-r border-slate-100 p-4 flex flex-col items-center justify-center min-w-[100px] text-center">
                            <Calendar className="w-5 h-5 text-blue-500 mb-1" />
                            <span className="text-xs font-semibold uppercase text-slate-500">{event.date}</span>
                        </div>

                        {/* Event Details */}
                        <div className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-slate-900 leading-tight">{event.title}</h3>
                                <Badge variant="outline" className={`ml-2 whitespace-nowrap gap-1 ${CategoryColor(event.category)}`}>
                                    <CategoryIcon category={event.category} />
                                    {event.category}
                                </Badge>
                            </div>

                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                                {event.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {event.time}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="truncate" title={event.location}>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
