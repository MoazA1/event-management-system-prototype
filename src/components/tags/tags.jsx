"use client";
import { useMemo } from "react";

const defaultTags = ["Free", "Online", "Happening Today", "Male Only", "Female Only"];

export default function TagsBar({ tags = defaultTags, value = [], onChange }) {
  const selected = useMemo(() => new Set(value), [value]);

  const toggle = (tag) => {
    const next = selected.has(tag)
      ? value.filter((t) => t !== tag)
      : [...value, tag];

    onChange?.(next);
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-3 py-2">
        {tags.map((tag) => {
          const isOn = selected.has(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`px-3 py-1.5 rounded-3xl text-[13px] whitespace-nowrap transition-all 
                ${isOn
                  ? "bg-[#00FFB2] text-black font-medium shadow-md"
                  : "bg-[#10161b] text-gray-400 hover:bg-neutral-800"
                }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
