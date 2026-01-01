"use client";

import React from "react";
import EventCard from "../cards/searchCard";

export default function SearchEventsList({ events }) {
  return (
    <div className="overflow-x-auto w-full py-1">
      <div className="flex flex-col gap-5 py-2">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            image={event.poster}
            onClick={() => console.log(event.title)}
          />
        ))}
      </div>
    </div>
  );
}
