"use client";

import { useState, useEffect } from "react";

export default function EventPosterHolder({
  src,
  alt = "Event poster",
  height = "h-56",
}) {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* COLLAPSED POSTER */}
      <div
        className={`relative w-full ${height} overflow-hidden cursor-zoom-in`}
        onClick={() => setOpen(true)}
      >
        {/* Blurred image = ONLY background */}
        {src && (
          <img
            src={src}
            alt=""
            aria-hidden
            className="
              absolute inset-0
              w-full h-full
              object-cover
              scale-125
              blur-3xl
            "
          />
        )}

        {/* Foreground poster */}
        {src ? (
          <img
            src={src}
            alt={alt}
            className="
              relative z-10
              w-full h-full
              object-contain
            "
          />
        ) : (
          <div className="relative z-10 w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No image available
          </div>
        )}
      </div>
    </>
  );
}

