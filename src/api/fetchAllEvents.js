// src/api/fakeEventsApi.js
import allEventsData from "../data/events.json";

// Fetch ALL events
export function fetchAllEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allEventsData);
    }, 300); // simulate network delay
  });
}
