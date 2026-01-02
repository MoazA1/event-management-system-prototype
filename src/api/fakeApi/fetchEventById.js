import allEventsData from "../../data/events.json";

export function fetchEventById(eventId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = allEventsData.find((e) => e.id === eventId) || null;
      resolve(event);
    }, 300);
  });
}
