"use client";
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { BiBarChartAlt2 } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { Lexend_Deca } from "next/font/google";
import { usePathname } from "next/navigation";

// configure the font
const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400"],
});

const links = [
  { href: "/", label: "Home", icon: GoHome },
  { href: "/explore", label: "Explore", icon: MdOutlineExplore },
  { href: "/calender", label: "Calender", icon: LuCalendarDays },
  { href: "/leaderboards", label: "Leaderboards", icon: BiBarChartAlt2 },
  { href: "/settings", label: "Settings", icon: IoSettingsOutline },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed bottom-0 left-0 w-full flex justify-around items-center px-6 py-3 
        rounded-t-4xl shadow-lg shadow-black/30 
        bg-[#10161b]
        text-white z-50 ${lexendDeca.className}`}
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center text-xs transition-colors ${
              isActive ? "text-[#00FFB2]" : "text-gray-300"
            }`}
          >
            <link.icon className="w-5 h-5 mb-1" />
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
