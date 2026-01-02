import { useMemo } from "react";

function parseDurationToMinutes(input) {
  if (!input) return 0;
  const s = String(input).trim().toLowerCase();

  // 1) HH:MM (e.g. "01:30")
  const hhmm = s.match(/^(\d{1,2})\s*:\s*(\d{1,2})$/);
  if (hhmm) {
    const h = parseInt(hhmm[1], 10) || 0;
    const m = parseInt(hhmm[2], 10) || 0;
    return h * 60 + m;
  }

  // 2) "90m", "2h", "1h 30m", "2 hours 15 minutes"
  let minutes = 0;

  const hMatch = s.match(/(\d+)\s*(h|hr|hrs|hour|hours)/);
  if (hMatch) minutes += parseInt(hMatch[1], 10) * 60;

  const mMatch = s.match(/(\d+)\s*(m|min|mins|minute|minutes)/);
  if (mMatch) minutes += parseInt(mMatch[1], 10);

  // 3) plain number => assume minutes
  if (minutes === 0) {
    const n = s.match(/^\d+$/);
    if (n) minutes = parseInt(n[0], 10);
  }

  return minutes;
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDurationNice(totalMinutes) {
  if (!totalMinutes) return "0m";
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

export default function DurationTimeline({ startTime, duration }) {
  const { start, end, minutes, error } = useMemo(() => {
    if (!startTime) return { start: null, end: null, minutes: 0, error: "No start time" };

    const startDate = new Date(startTime);
    if (isNaN(startDate.getTime()))
      return { start: null, end: null, minutes: 0, error: "Invalid start time" };

    const mins = parseDurationToMinutes(duration);
    const endDate = new Date(startDate.getTime() + mins * 60 * 1000);

    return { start: startDate, end: endDate, minutes: mins, error: null };
  }, [startTime, duration]);

  if (error) {
    return (
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-gray-300">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // If duration is missing/0, still show start
  const hasDuration = minutes > 0;

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/2 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-white text-base font-semibold">Schedule</h4>
        {hasDuration && (
          <span className="text-gray-300 text-sm">
            Total: <span className="text-white">{formatDurationNice(minutes)}</span>
          </span>
        )}
      </div>

      <div className="mt-4">
        {/* Timeline line */}
        <div className="relative h-10">
          <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1 rounded-full bg-[#00FFB2]" />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#00FFB2]" />
          {hasDuration && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#00FFB2]" />
          )}

          {/* Progress fill */}
          {hasDuration && (
            <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1 rounded-full bg-white/30" />
          )}
        </div>

        {/* Labels */}
        <div className="mt-2 flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-xs">Start</p>
            <p className="text-white text-sm font-medium">{formatTime(start)}</p>
          </div>

          {hasDuration ? (
            <div className="text-right">
              <p className="text-gray-400 text-xs">Finish</p>
              <p className="text-white text-sm font-medium">{formatTime(end)}</p>
            </div>
          ) : (
            <div className="text-right">
              <p className="text-gray-400 text-xs">Finish</p>
              <p className="text-gray-500 text-sm font-medium">—</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
