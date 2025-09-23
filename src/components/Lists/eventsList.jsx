"use client";

import React from "react";
import EventCard from "../cards/eventCard";

export default function EventsList({ events }) {
    return (
        <div className="overflow-x-auto w-full py-4">
            <div className="flex gap-4 px-4 overflow-x-auto flex-nowrap">
                {events.map((event) => (
                    <EventCard key={event.id} title={event.title} image={event.poster} onClick={() => console.log(event.title)} />
                ))}
            </div>

        </div>
    );
}
