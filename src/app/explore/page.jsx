"use client";
import { CiFilter } from "react-icons/ci";

export default function Explore() {
  return (
    <div className="relative w-full h-full">
      {/* Filter icon positioned over navbar */}
      <button
        className="absolute top-4 right-4 z-50"
        aria-label="Filter events"
      >
        <CiFilter className="w-6 h-6 text-white" />
      </button>

      {/* Page content */}
      <div className="pt-12">
        <h1 className="text-xl text-white">Explore Page</h1>
      </div>
    </div>
  );
}

