"use client";

import React from "react";
import EventCard from "../cards/eventCard";

export default function EventsList({ events }) {
    return (
        <div className="overflow-x-auto w-full py-1">
            <div className="flex gap-2 px-4 overflow-x-auto flex-nowrap">
                {events.map((event) => (
                    <EventCard id= {event.id} key={event.id} title={event.title} image={event.poster} onClick={() => console.log(event.title)} />
                ))}
            </div>

        </div>
    );
}
