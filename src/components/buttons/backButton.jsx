"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function BackButton({ size = 22, className = "" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className={`
        p-2
        rounded-full
        bg-[#1B2228]
        text-gray-300
        hover:text-white
        hover:bg-white/10
        transition
        ${className}
      `}
    >
      <IoIosArrowBack size={size} />
    </button>
  );
}
