"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function SearchBar({ placeholder = "Search events & hosts", onSearch }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    if (onSearch) onSearch(query);
  };

  const handleReset = () => {
    setQuery("");
    setIsSearching(false);
    if (onSearch) onSearch(""); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ml-3 mr-3 w-[94%] h-12 max-w-[720px] bg-[#10161b] rounded-2xl inline-flex justify-center items-center gap-1 overflow-hidden"
    >
      <div className="flex-1 self-stretch p-1 relative flex justify-start items-center">
        <div className="flex-1 self-stretch px-5 flex justify-start items-center gap-2.5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-white text-base font-normal placeholder-gray-400"
          />
        </div>

        {/* Toggle between Search and Cancel buttons */}
        {!isSearching ? (
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex justify-center items-center w-10 h-10 rounded-full hover:bg-neutral-800 transition"
          >
            <FiSearch className="w-5 h-5 text-gray-400" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Cancel"
            onClick={handleReset}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex justify-center items-center w-10 h-10 rounded-full hover:bg-neutral-800 transition"
          >
            <IoClose className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
}

