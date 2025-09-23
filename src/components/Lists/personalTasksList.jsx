"use client";

import React, { useState, useEffect } from "react";
import PersonalTaskCard from "../cards/personalTaskCard";
import { fetchTasks } from "../../api/fakePersonalTasks";

export default function PersonalTasksList({ selectedDate, userId }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const dateToUse = selectedDate || new Date().toISOString().slice(0, 10);

    useEffect(() => {
        setLoading(true);
        fetchTasks({ date: dateToUse, userId })
            .then((data) => setTasks(data))
            .finally(() => setLoading(false));
    }, [dateToUse, userId]);

    if (loading) {
        return <div className="text-gray-500">Loading tasks...</div>;
    }

    if (tasks.length === 0) {
        return <div className="text-gray-500">No tasks for this date.</div>;
    }

    // Show only the first 2 tasks if showAll is false
    const tasksToDisplay = showAll ? tasks : tasks.slice(0, 2);

    return (
        <div className="flex flex-col gap-3">
            {tasksToDisplay.map((task) => (
                <PersonalTaskCard key={task.id} task={task} />
            ))}

            {/* Show All / Show Less button */}
            {tasks.length > 2 && (
                <div className="flex justify-center mt-2">
                    <button
                        className="text-sm text-[#A9CECC] hover:underline"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : `Show All (${tasks.length})`}
                    </button>
                </div>

            )}
        </div>
    );
}


