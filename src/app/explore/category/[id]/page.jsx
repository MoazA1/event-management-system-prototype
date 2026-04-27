"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/buttons/backButton";
import SearchEventsList from "@/components/Lists/searchEventsList";
import { fetchEventsByCategory } from "@/api/fakeApi/fetchEventsByCategory";
import { Lexend_Deca } from "next/font/google";


const lexendDeca = Lexend_Deca({ subsets: ["latin"], weight: ["400"] });

export default function Page() {
  const { id } = useParams();
  const title = id?.charAt(0).toUpperCase() + id?.slice(1);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchEventsByCategory(id)
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="w-full mt-4">
      {/* Header */}
      <div className="relative flex items-center px-2 pt-0">
        {/* Back button - left */}
        <BackButton />

        {/* Center title */}
        <h1 className={`absolute left-1/2 -translate-x-1/2 text-[18px] text-white font-semibold ${lexendDeca.className}`}>
          {title}
        </h1>
      </div>
      <div className="mt-4 px-2">
        {loading ? (
          <p className="text-gray-400 text-center mt-4">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">
            No events in this category.
          </p>
        ) : (
          <SearchEventsList events={events} />
        )}
      </div>
    </div>
  );
}


