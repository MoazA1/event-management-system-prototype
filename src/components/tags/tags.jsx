"use client";
import { useState } from "react";

const tagsList = ["Free", "Online", "Happening Today", "Male Only", "Female Only"];

export default function TagsBar({ tags = tagsList, onChange }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleClick = (tag) => {
    let updated;
    if (selectedTags.includes(tag)) {
      updated = selectedTags.filter((t) => t !== tag);
    } else {
      updated = [...selectedTags, tag];
    }
    setSelectedTags(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-3 py-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleClick(tag)}
            className={`px-3 py-1.5 rounded-3xl text-[13px] whitespace-nowrap transition-all 
              ${
                selectedTags.includes(tag)
                  ? "bg-[#00FFB2] text-black font-medium shadow-md"
                  : "bg-[#10161b] text-gray-400 hover:bg-neutral-800"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

