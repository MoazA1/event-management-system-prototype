import allEventsData from "../data/events.json";

// Fetch events by category (e.g. "trending", "sports")
export function fetchEventsByCategory(categoryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!categoryId) return resolve([]);

      const result = allEventsData.filter(
        (event) =>
          Array.isArray(event.categoryIds) &&
          event.categoryIds.includes(categoryId)
      );

      resolve(result);
    }, 300);
  });
}

// 
//export function fetchTrendingEvents() {
  //return fetchEventsByCategory("trending");
//}

