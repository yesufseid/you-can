"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CategoryDropdown from "./CategoryDropdown";
import CategoryItem from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";

interface Category {
  name: string;
  mass: number;
  image?: string;
  id: string;
}

const CategoryManager: React.FC<{
  onCategorySelect: (category: Category) => void;
}> = ({ onCategorySelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { category,filterd }=useSelector((state: RootState) => state.category); // Fixed typo
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>([]);
  


  return (
    <div>
      <div className="lg:mx-40 mb-2">
      <CategoryDropdown onChange={setSelectedCategoryNames} />
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