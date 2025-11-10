import React from "react";
import CategoryCard from "../cards/categoryCard";

const categories = [
  "Conferences",
  "Hackathons",
  "Workshops",
  "Lectures",
  "Sports",
  "E Sports",
  "Entertainment",
  "Global",
  
];

export default function CategoryList() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 px-4 py-2">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category}
            imageSrc={`/${category}.jpg`}
          />
        ))}
      </div>
    </div>
  );
}
