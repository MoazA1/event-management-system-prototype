"use client";

const COLOR_VARIANTS = [
  "bg-[#00FFB2]"
];

export default function EventTagsBar({ tags = [] }) {
  if (!tags.length) return null;

  return (
    <div className="w-full py-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => {
          const color = COLOR_VARIANTS[index % COLOR_VARIANTS.length];

          return (
            <span
              key={`${tag}-${index}`}
              className={`px-3 py-1.5 rounded-3xl text-[13px] text-black whitespace-nowrap select-none ${color}`}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
