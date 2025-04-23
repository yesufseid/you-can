"use client";

import { useState } from "react";
import { Avatar, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface CategoryItemProps {
  name: string;
  mass: number; // pre-calculated mass (volume * density)
  image?: string;
  initialCount?: number;
  setCount: React.Dispatch<React.SetStateAction<{}>>
  count:{}
}

export default function CategoryItem({
  name,
  mass,
  image,
  initialCount = 0,
  setCount,
  count
}: CategoryItemProps) {
  // const [count, setCount] = useState(initialCount);

  const handleChange = (newCount: number) => {
    if (newCount < 0) return;
    setCount((prev)=>({...prev,name:newCount}));
  };
console.log(name,mass);

  return (
    <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm gap-2">
      <div className="flex items-center gap-3">
        <Avatar src={image} sx={{ width: 32, height: 32 }} />
        <div className="text-sm font-medium text-gray-700">
          {name} = {mass}g
        </div>
      </div>

      <div className="flex items-center gap-1">
        <IconButton size="small" onClick={() => handleChange(count.name - 1)}>
          <Remove fontSize="small" />
        </IconButton>

        <TextField
          value={count.name || 0}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            handleChange(val);
          }}
          type="number"
          inputProps={{ min: 0 }}
          size="small"
          className="w-16"
        />

        <IconButton size="small" onClick={() => handleChange(count.name + 1)}>
          <Add fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
