import React from "react";
import Link from "next/link";

export default function CategoryCard({ imageSrc, title, id }) {
  return (
    <Link href={`/explore/category/${id}`}>
      <div className="w-24 h-32 relative flex-shrink-0">
        <div className="w-24 h-28 left-0 top-[12px] absolute bg-[#10161b] rounded-2xl" />

        <img
          className="w-20 h-20 left-[8px] top-0 absolute bg-blend-luminosity rounded-[10px] object-cover"
          src={imageSrc}
          alt={title}
        />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-[12px] text-center">
          {title}
        </div>
      </div>
    </Link>
  );
}




