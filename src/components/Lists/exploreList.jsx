"use client";
import { useRef } from "react";
import ExploreCard from "@/components/cards/exploreCard";

export default function ExploreList({ events = [] }) {
  const containerRef = useRef(null);

  // Split events into columns of 3
  const chunkedEvents = [];
  for (let i = 0; i < events.length; i += 3) {
    chunkedEvents.push(events.slice(i, i + 3));
  }

  const columnWidth = 300 + 12; // card width + gap (adjust gap if needed)

  let scrollTimeout;

  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    // wait until scrolling stops
    scrollTimeout = setTimeout(() => {
      if (!containerRef.current) return;
      const scrollLeft = containerRef.current.scrollLeft;
      const pageIndex = Math.round(scrollLeft / columnWidth);
      containerRef.current.scrollTo({
        left: pageIndex * columnWidth,
        behavior: "smooth", // smooth snapping
      });
    }, 100); // 100ms debounce after scroll stops
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex overflow-x-auto gap-3 py-2 scrollbar-hide"
      onScroll={handleScroll}
    >
      {chunkedEvents.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-3 min-w-[300px]">
          {column.map((event) => (
            <ExploreCard
              key={event.id}
              title={event.title}
              date={event.date}
              imageUrl={event.imageUrl}
            />
          ))}
        </div>
      ))}
    </div>
  );
}


