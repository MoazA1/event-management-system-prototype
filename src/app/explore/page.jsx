"use client";
import SearchBar from "@/components/SearchBar/searchBar";
import TagsBar from "@/components/tags/tags";
import { Lexend_Deca } from "next/font/google";
import { fetchEventsByCategory } from "@/api/fetchEventsByCategory";
import { fetchAllEvents } from "@/api/fetchAllEvents";
import { useState, useEffect, useMemo } from "react";
import ExploreList from "@/components/Lists/exploreList";
import CategoryList from "@/components/Lists/categoryList";
import SearchEventsList from "@/components/Lists/searchEventsList";

const lexendDeca = Lexend_Deca({ subsets: ["latin"], weight: ["400"] });

const TAGS = ["Free", "Online", "Happening Today", "Male Only", "Female Only"];

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isHappeningToday(event) {
  if (event.date) {
    const [y, m, d] = event.date.split("-").map(Number);
    if (!y || !m || !d) return false;
    const eventDate = new Date(y, m - 1, d);
    return isSameDay(eventDate, new Date());
  }
  return false;
}

function matchesTag(event, tag) {
  if (tag === "Happening Today") return isHappeningToday(event);
  const ids = Array.isArray(event.categoryIds) ? event.categoryIds : [];
  return ids.includes(tag);
}

export default function Explore() {
  const [events, setEvents] = useState([]);            // all events
  const [trendingEvents, setTrendingEvents] = useState([]); // trending only
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // load all + trending
    fetchAllEvents().then((data) => setEvents(Array.isArray(data) ? data : []));
    fetchEventsByCategory("trending").then((data) =>
      setTrendingEvents(Array.isArray(data) ? data : [])
    );
  }, []);

  // 1) Search filter (search across ALL events)
  const searchedEvents = useMemo(() => {
    const q = String(searchQuery || "").trim().toLowerCase();
    if (!q) return events;

    return events.filter((event) => {
      const title = (event.title || "").toLowerCase();
      const host = (event.host || "").toLowerCase();
      const cats = Array.isArray(event.categoryIds)
        ? event.categoryIds.join(" ").toLowerCase()
        : "";

      return title.includes(q) || host.includes(q) || cats.includes(q);
    });
  }, [events, searchQuery]);

  // 2) Tags filter (AND)
  const filteredEvents = useMemo(() => {
    if (selectedTags.length === 0) return searchedEvents;

    return searchedEvents.filter((event) =>
      selectedTags.every((tag) => matchesTag(event, tag))
    );
  }, [searchedEvents, selectedTags]);

  // Search mode if query or tags exist
  const isSearching = useMemo(() => {
    const hasQuery = String(searchQuery || "").trim().length > 0;
    const hasTags = selectedTags.length > 0;
    return hasQuery || hasTags;
  }, [searchQuery, selectedTags]);

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />

      <div className="mt-[10px]">
        <TagsBar tags={TAGS} value={selectedTags} onChange={setSelectedTags} />
      </div>

      {isSearching ? (
        <>
          <div className={`mt-1 ml-4 text-[26px] ${lexendDeca.className}`}>
            <h1>Search Results</h1>
          </div>

          <SearchEventsList events={filteredEvents} />

          {filteredEvents.length === 0 && (
            <p className="text-gray-400 text-center mt-4">No events found.</p>
          )}
        </>
      ) : (
        <>
          <div className={`mt-2 ml-4 mb-1 text-[26px] ${lexendDeca.className}`}>
            <h1>From Clubs You Follow</h1>
          </div>

          {/* for now using all events; later replace with "followed clubs" events */}
          <ExploreList events={events} />

          <div className={`mt-4 ml-4 text-[26px] ${lexendDeca.className}`}>
            <h1>Categories</h1>
          </div>
          <CategoryList />

          <div className={`mt-4 ml-4 text-[26px] ${lexendDeca.className}`}>
            <h1>Trending</h1>
          </div>

          {/* trending section uses the trending API */}
          <ExploreList events={trendingEvents} />
        </>
      )}
    </div>
  );
}
