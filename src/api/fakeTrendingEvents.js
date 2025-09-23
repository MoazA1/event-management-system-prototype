import allEventsData from "../data/events.json"; // JSON with all events

// Fetch only trending events
export function fetchTrendingEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const trendingEvents = allEventsData.filter(event =>
        event.categoryIds && event.categoryIds.includes("cat_trending")
      );
      resolve(trendingEvents);
    }, 300); // simulate network delay
  });
}
