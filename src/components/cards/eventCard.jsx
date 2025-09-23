"use client";

import React from "react";

export default function EventCard({ title, image, onClick }) {
  return (
    <div
      className="w-40 h-72 flex-shrink-0 relative cursor-pointer flex flex-col items-center"
      onClick={onClick}
    >
      {/* Image container */}
      <div className="w-full h-56 bg-white rounded-3xl overflow-hidden shadow-[0px_5px_15px_0px_rgba(0,0,0,0.35)]">
        <img
          className="w-full h-full object-cover"
          src={image || "https://placehold.co/182x227"}
          alt={title}
        />
      </div>

      {/* Event title */}
      <div className="mt-2 text-center text-white text-base font-medium font-['Lexend_Deca'] truncate w-full">
        {title || "Event Title"}
      </div>
    </div>
  );
}

