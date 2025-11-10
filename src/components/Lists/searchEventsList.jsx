"use client";

import React from "react";
import EventCard from "../cards/searchCard";

export default function SearchEventsList({ events }) {
    return (
        <div className="overflow-y-auto w-full py-1">
            <div className="flex gap-2 px-4 overflow-y-auto flex-nowrap">
                {events.map((event) => (
                    <EventCard key={event.id} title={event.title} image={event.poster} onClick={() => console.log(event.title)} />
                ))}
            </div>

        </div>
    );
}