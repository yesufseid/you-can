"use client";

import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import CategoryItem from "./Card";
import { useSelector } from "react-redux";
import { RootState} from "../Redux/store";

interface Category {
  name: string;
  mass: number;
  image?: string;
  id: string;
}

const CategoryManager= () => {
  const { filterd }=useSelector((state: RootState) => state.category); // Fixed typo
  return (
    <div>
      <div className="lg:mx-40 mb-2">
      <CategoryDropdown />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:mx-40 gap-5">
        {filterd.map((cat: Category) => (
          <div key={cat.id}> {/* Use cat.id for unique key */}
            <CategoryItem
            id={cat.id}
              name={cat.name}
              mass={cat.mass}
              image={cat.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;