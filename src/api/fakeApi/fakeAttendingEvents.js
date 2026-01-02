import eventsData from "../../data/attendingEvents.json";

// Simulate fetching events (with optional filtering)
export function fetchEvents({ date, userId }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter events by date if provided
      const filtered = date
        ? eventsData.filter((evt) => evt.date === date)
        : eventsData;
      resolve(filtered);
    }, 500); // Simulate network delay
  });
}
