"use client";

import { useState, useEffect } from "react";
import DayPicker from "@/components/DatePickers/homeDayPicker";
import PersonalTasksList from "@/components/Lists/personalTasksList";
import AttendingTasksList from "@/components/Lists/attendingEventsList";
import TrendingEventsList from "@/components/Lists/eventsList";
import { fetchEventsByCategory } from "@/api/fetchEventsByCategory";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [trendingEvents, setTrendingEvents] = useState([]);

  useEffect(() => {
    fetchEventsByCategory("trending").then((data) =>
      setTrendingEvents(Array.isArray(data) ? data : [])
    );
  }, []);

  return (
    <div className="mt-[0px] ml-[12px] pt-[0px]">
      <div className={`mb-[20px] ml-[10px] text-[28px] ${lexendDeca.className}`}>
        <h1>Tasks & Events</h1>
      </div>

      <div className="mt-[10px] ml-[5px]">
        <DayPicker onDateSelect={setSelectedDate} />
      </div>

      <div className="mt-[20px] ml-[15px] justify-start text-[#A9CECC] text-xs font-['Inter'] uppercase tracking-wide">
        Personal
      </div>

      <div className="mt-[10px] ml-[5px] mr-[10px]">
        <PersonalTasksList selectedDate={selectedDate} />
      </div>

      <div className="mt-[20px] ml-[15px] justify-start text-[#A9CECC] text-xs font-['Inter'] uppercase tracking-wide">
        Events to Attend
      </div>

      <div className="mt-[10px] ml-[5px] mr-[10px]">
        <AttendingTasksList selectedDate={selectedDate} />
      </div>

      <div className={`mt-[30px] mb-[0px] ml-[10px] text-[28px] ${lexendDeca.className}`}>
        <h1>Trending</h1>
      </div>

      <TrendingEventsList events={trendingEvents} />
    </div>
  );
}
