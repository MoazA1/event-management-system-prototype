"use client";

export default function ExploreCard({
  imageUrl = "/1739171573613.jpg",
  title = "This is the title of a cool event",
  date = "2025-09-26", // Default ISO format
}) {
  // Convert ISO date to "Fri 26 Sep"
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="w-full max-w-screen-sm bg-[#1B2228] rounded-xl flex gap-3 pl-5 hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-[92px] h-[92px] rounded-[12px] overflow-hidden border-[1px] border-[#1B2221] flex-shrink-0 relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <div className="text-white text-[16px] font-semibold font-['Inter'] leading-snug line-clamp-2">
          {title}
        </div>
        <div className="text-gray-200 text-[12px] font-normal font-['Inter'] mt-1">
          {formattedDate}
        </div>
      </div>
    </div>
  );
}