"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/buttons/backButton";
import { Lexend_Deca } from "next/font/google";
import { fetchEventById } from "@/api/fakeApi/fetchEventById";
import EventPosterHolder from "@/components/media/eventPosterHolder";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import DurationTimeline from "@/components/media/durationTimeline";
import EventTagsBar from "@/components/tags/eventTags";

const lexendDeca = Lexend_Deca({ subsets: ["latin"], weight: ["400"] });

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function formatEventDate(dateString) {
  if (!dateString) return "";

  const normalized = String(dateString).replace(/\//g, "-");
  const date = new Date(normalized);

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

export default function Page() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [scrollY, setScrollY] = useState(0);
  const [hideHero, setHideHero] = useState(false);

  const [posterOpen, setPosterOpen] = useState(false);

  const lastYRef = useRef(0);
  const lastDirRef = useRef("down");
  const endTimerRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchEventById(id)
      .then((data) => setEvent(data ?? null))
      .finally(() => setLoading(false));
  }, [id]);

  // Scroll: direction + "scroll end" detection
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrollY(y);

      const lastY = lastYRef.current;
      const dir = y > lastY ? "down" : y < lastY ? "up" : lastDirRef.current;

      lastYRef.current = y;
      lastDirRef.current = dir;

      if (dir === "up") setHideHero(false);

      if (endTimerRef.current) clearTimeout(endTimerRef.current);
      endTimerRef.current = setTimeout(() => {
        if (lastDirRef.current === "down" && (window.scrollY || 0) > 10) {
          setHideHero(true);
        }
      }, 120);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
    };
  }, []);


  useEffect(() => {
    if (!posterOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setPosterOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [posterOpen]);

  // Hero behavior
  const heroMax = 512;
  const heroMin = 80;
  const collapseDistance = 220;

  const progress = useMemo(
    () => clamp(scrollY / collapseDistance, 0, 1),
    [scrollY]
  );

  const heroHeight = useMemo(() => {
    if (hideHero) return 0;
    return heroMax - (heroMax - heroMin) * progress;
  }, [hideHero, progress]);

  const heroOpacity = useMemo(() => {
    if (hideHero) return 0;
    return clamp(1 - progress * 1.2, 0, 1);
  }, [hideHero, progress]);

  if (loading) {
    return <p className="text-gray-400 text-center mt-6">Loading...</p>;
  }

  if (!event) {
    return (
      <div className="p-4">
        <BackButton />
        <p className="text-gray-400 text-center mt-6">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">

      {posterOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPosterOpen(false)}
        >
          <div
            className="relative w-full max-w-[900px]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={event.poster}
              alt={event.title}
              className="w-full h-auto rounded-2xl object-contain"
            />

            <button
              className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-2 text-white"
              onClick={() => setPosterOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sticky poster */}
      <div className="sticky top-0 z-10">
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: `${heroHeight}px`,
            opacity: heroOpacity,
            transition: "height 160ms ease, opacity 160ms ease",
          }}
        >

          <div
            className="h-full w-full cursor-zoom-in"
            onClick={() => setPosterOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setPosterOpen(true);
            }}
          >
            <EventPosterHolder
              src={event.poster}
              alt={event.title}
              height="h-full"
            />
          </div>

          {/* Back button overlays poster */}
          {!hideHero && (
            <div className="absolute top-3 left-3 z-50">
              <BackButton />
            </div>
          )}
        </div>
      </div>

      {/* Sheet */}
      <div className={`relative z-50 ${hideHero ? "mt-0" : "-mt-10"}`}>
        <div className="w-full rounded-t-3xl bg-black/50 shadow-lg shadow-black/30 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-5">
            <h2 className={`text-white text-3xl font-semibold ${lexendDeca.className}`}>
              {event.title}
            </h2>

            

            <div className="mt-3 text-gray-300 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <IoLocationOutline className="text-gray-500 text-xl" />
                <p>{event.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <CiCalendar className="text-gray-500 text-xl" />
                <p>{formatEventDate(event.date)}</p>
              </div>

              <div>
                <DurationTimeline startTime={event.time} duration={event.duration} />
              </div>

              <EventTagsBar tags={event.categoryIds} ></EventTagsBar>
            </div>

            {event.description && (
              <div className="mt-6">
                <h3 className="text-white text-xl font-semibold">Event Info</h3>
                <p className="mt-2 text-gray-300">{event.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
