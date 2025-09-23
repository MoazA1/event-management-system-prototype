"use client";

import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function PersonalTaskCard({ task }) {
  const [checked, setChecked] = useState(task.checked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    // Optionally, send API update here
  };

  return (
    <div className="w-full h-14 p-4 bg-zinc-100 rounded-xl inline-flex justify-start items-center gap-3">
      <div className="flex-1 flex justify-start items-center gap-4">
        {/* MUI Checkbox */}
        <Checkbox
          checked={checked}
          onChange={handleChange}
          sx={{
            color: "#A9CECC",
            '&.Mui-checked': {
              color: "#A9CECC",
            },
            padding: 0,
            '& .MuiSvgIcon-root': { fontSize: 24 }, // icon size
          }}
        />

        {/* Task title */}
        <div className="text-neutral-900 text-base font-medium font-['Inter'] truncate">
          {task.title}
        </div>
      </div>
    </div>
  );
}


