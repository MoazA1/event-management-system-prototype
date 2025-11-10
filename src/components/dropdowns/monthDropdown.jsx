"use client";
import React, { useState } from "react";

export default function MonthDropdown() {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select month");

  const handleSelect = (month) => {
    setSelected(month);
    setOpen(false);
  };

  return (
    <div
      className="w-28 min-w-28 h-[28px] p-2.5 relative bg-[#10161b] rounded-[10px] inline-flex justify-between items-center gap-2.5 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      {/* Selected text */}
      <div className="text-white text-base font-light font-['Inter']">
        {selected}
      </div>

      {/* Arrow */}
      <div
        className={`w-3 h-1.5 outline outline-1 outline-offset-[-0.50px] outline-black transition-transform ${
          open ? "-rotate-180" : "rotate-0"
        }`}
      />

      {/* Dropdown list */}
      {open && (
        <div className="left-0 top-[42px] absolute w-full bg-Colors-primary rounded-[10px] shadow-[5px_5px_20px_0px_rgba(218,188,255,0.20)] flex flex-col">
          {months.map((month) => (
            <div
              key={month}
              className="w-36 p-2.5 bg-Colors-primary rounded-[10px] hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(month)}
            >
              <div className="text-black text-base font-light font-['Inter']">
                {month}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
