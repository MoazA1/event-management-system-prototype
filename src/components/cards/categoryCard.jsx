import React from "react";

export default function CategoryCard({ imageSrc, title }) {
  return (
    <div className="w-24 h-32 relative flex-shrink-0">
      {/* Background container */}
      <div className="w-24 h-28 left-0 top-[12px] absolute bg-[#10161b] rounded-2xl" />

      {/* Image container */}
      <img
        className="w-20 h-20 left-[8px] top-0 absolute bg-blend-luminosity rounded-[10px] object-cover"
        src={imageSrc}
        alt={title}
      />

      {/* Title text */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-[12px] text-center">
        {title}
      </div>
    </div>
  );
}




