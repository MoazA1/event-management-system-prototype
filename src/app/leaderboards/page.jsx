"use client";
import SearchBar2 from "@/components/SearchBar/searchBar2";
import TagsBar1 from "@/components/tags/leaderTags";
import TagsBar2 from "@/components/tags/leaderTags2";
import MonthDropdownMUI from "@/components/dropdowns/monthDropdown";
import { Lexend_Deca } from "next/font/google";



const lexendDeca = Lexend_Deca({
    subsets: ["latin"],
    weight: ["400"],
});
export default function Leaderboards() {
    return (
        <div>
            <div>
                <SearchBar2 />
            </div>
            <div className="mt-[10px] flex space-x-2">
                <TagsBar1 />
                
            </div>
            <div className="mt-[10px]">
                <MonthDropdownMUI />
            </div>


        </div>
    );
}