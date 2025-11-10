"use client";
import { CiFilter } from "react-icons/ci";
import SearchBar from "@/components/SearchBar/searchBar";
import TagsBar from "@/components/tags/tags";
import { Lexend_Deca } from "next/font/google";
import { fetchTrendingEvents } from "@/api/fakeTrendingEvents";
import { useState, useEffect } from "react";
import ExploreList from "@/components/Lists/exploreList";
import CategoryList from "@/components/Lists/categoryList";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchTrendingEvents().then((data) => {
      setEvents(data);
      setFilteredEvents(data);
    });
  }, []);

  const handleSearch = (query) => {
    const q = String(query || "").trim().toLowerCase();

    if (!q) {
      setFilteredEvents(events);
      setIsSearching(false);
      return;
    }

    const filtered = events.filter((event) => {
      const title = (event.title || "").toLowerCase();
      const host = (event.host || "").toLowerCase();
      const tags = Array.isArray(event.categoryIds)
        ? event.categoryIds.join(" ").toLowerCase()
        : (event.categoryIds || "").toString().toLowerCase();

      return (
        title.includes(q) ||
        host.includes(q) ||
        tags.includes(q)
      );
    });

    setFilteredEvents(filtered);
    setIsSearching(true);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {isSearching ? (
        <>
          <div className="mt-[10px]">
            <TagsBar />
          </div>
          <div className={`mt-4 ml-4 text-[26px] ${lexendDeca.className}`}>
            <h1>Search Results</h1>
          </div>

          <ExploreList events={filteredEvents} />

          {filteredEvents.length === 0 && (
            <p className="text-gray-400 text-center mt-4">
              No events found.
            </p>
          )}
        </>
      ) : (
        <>
          <div className="mt-[10px]">
            <TagsBar />
          </div>

          <div className={`mt-2 ml-4 mb-1 text-[26px] ${lexendDeca.className}`}>
            <h1>From Clubs You Follow</h1>
          </div>
          <ExploreList events={events} />

          <div className={`mt-4 ml-4 text-[26px] ${lexendDeca.className}`}>
            <h1>Categories</h1>
          </div>
          <CategoryList />

          <div className={`mt-4 ml-4 text-[26px] ${lexendDeca.className}`}>
            <h1>Trending</h1>
          </div>
          <ExploreList events={events} />
        </>
      )}
    </div>
  );
}
