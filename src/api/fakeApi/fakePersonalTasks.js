// src/api/fakeTasks.js
import tasks from '../../data/personalEvents.json';

export function fetchTasks({ date, checked, categoryId }) {
  return new Promise((resolve) => {
    // simulate network delay
    setTimeout(() => {
      let filtered = tasks;

      if (date) {
        filtered = filtered.filter(task => task.date === date);
      }
      if (checked !== undefined) {
        filtered = filtered.filter(task => task.checked === checked);
      }
      if (categoryId) {
        filtered = filtered.filter(task =>
          task.categories.some(cat => cat.id === categoryId)
        );
      }

      resolve(filtered);
    }, 300); // 300ms delay
  });
}
