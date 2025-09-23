"use client";

import { useMemo, useState } from "react";
import dayjs from "dayjs";

export default function DayPicker({ today = new Date(), onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs(today).format("MMM"));
  const [selectedDate, setSelectedDate] = useState(dayjs(today)); // track chosen date

  // Generate all dates until the end of next month
  const days = useMemo(() => {
    const start = dayjs(today);
    const end = start.add(1, "month").endOf("month");

    const dates = [];
    let current = start;

    while (current.isBefore(end) || current.isSame(end, "day")) {
      dates.push(current);
      current = current.add(1, "day");
    }
    return dates;
  }, [today]);

  const dayName = (date) => date.format("ddd").toUpperCase();
  const dayNumber = (date) => date.format("DD");
  const monthName = (date) => date.format("MMM").toUpperCase();

  return (
    <div className="flex w-full">
      {/* Fixed Month Box */}
      <div className="flex items-center justify-center min-w-[40px] rounded-lg border border-gray-300 bg-gray-700 text-white text-xs font-semibold px-1 py-3">
        <div className="flex flex-col items-center gap-1">
          {currentMonth.split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>

      {/* Scrollable Days */}
      <div
        className="overflow-x-auto w-full"
        onScroll={(e) => {
          const scrollDiv = e.currentTarget;
          const approxIndex = Math.round(scrollDiv.scrollLeft / 64);
          const visibleDate = days[approxIndex];
          if (visibleDate) {
            const newMonth = monthName(visibleDate);
            if (newMonth !== currentMonth) {
              setCurrentMonth(newMonth);
            }
          }
        }}
      >
        <div className="flex gap-3 px-4 py-2">
          {days.map((date, idx) => {
            const isToday = dayjs(today).isSame(date, "day");
            const isSelected = selectedDate.isSame(date, "day");
            const prevDate = idx > 0 ? days[idx - 1] : null;
            const isNewMonth = prevDate && prevDate.month() !== date.month();

            return (
              <div key={date.toString()} className="flex items-center">
                {/* Vertical Divider for New Month */}
                {isNewMonth && (
                  <div className="flex flex-col items-center mx-2">
                    <div className="flex flex-row items-center">
                      {/* Line */}
                      <div className="w-px h-20 bg-gray-400 opacity-60"></div>
                      {/* Month letters */}
                      <div className="flex flex-col items-center ml-1 text-xs text-gray-400 font-semibold">
                        {monthName(date).split("").map((char, i) => (
                          <span key={i}>{char}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Day Box */}
                <button
                  onClick={() => {
                    setSelectedDate(date);
                    onDateSelect?.(date.format("YYYY-MM-DD")); // pass to parent
                  }}
                  className={`min-w-[60px] flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg border transition ${
                    isSelected
                      ? "bg-[#A9CECC] text-black border-[#A9CECC]"
                      : isToday
                      ? "border-gray-400 text-white"
                      : "border-gray-300 text-white"
                  }`}
                >
                  <div className="text-xs font-semibold">{dayName(date)}</div>
                  <div className="text-base font-semibold">{dayNumber(date)}</div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
