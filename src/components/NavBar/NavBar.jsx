"use client";
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { BiBarChartAlt2 } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { Lexend_Deca } from "next/font/google";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
//import Avatar from "../Avatar/Avatar"

// configure the font
const lexendDeca = Lexend_Deca({
    subsets: ["latin"],   // required
    weight: ["400"],      // must be an array of available weights
});

const links = [
    { href: "/home", label: "Home", icon: GoHome },
    { href: "/explore", label: "Explore", icon: MdOutlineExplore },
    { href: "/calender", label: "Calender", icon: LuCalendarDays },
    { href: "/leaderboards", label: "Leaderboards", icon: BiBarChartAlt2 },
    { href: "/settings", label: "Settings", icon: IoSettingsOutline },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    return (
        <nav className={`text-white p-4 flex items-center justify-between fixed w-full z-50 bg-transparent ${lexendDeca.className}`}>
            {/* Hamburger */}
            <button
                className="md:hidden p-1"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
            >
                <IoIosMenu className="w-6 h-6" />
            </button>

            {/* Sliding Menu */}
            <div
                className={`fixed inset-0 z-50 bg-[#1B2228] transform ${open ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-500 ease-in-out`}
            >
                {/* Top bar inside menu */}
                <div className="flex items-center justify-between p-5">
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                    >
                        <IoIosMenu className="w-6 h-6" />
                    </button>

                    {/* Avatar inside sliding menu 
          <Avatar
            imageUrl="/Avatar.svg" // Replace with user's avatar
            size={26}
            profileUrl="/profile"
          />
          */}
                </div>

                {/* Menu Links */}
                <div className="flex flex-col gap-10 p-4 mt-4 ml-6">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-4 text-sm ${isActive ? "text-[#00FFB2]" : "text-white"
                                    }`}
                                onClick={() => setOpen(false)}
                            >
                                <link.icon className="w-6 h-6 shrink-0" />
                                {link.label}
                            </a>
                        );
                    })}

                </div>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </nav>
    );
}
