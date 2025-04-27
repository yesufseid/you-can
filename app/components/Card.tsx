"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { useTheme } from "next-themes";


interface CategoryItemProps {
  id:string;
  name: string;
  mass: number;
  image?: string;
}

export default function CategoryItem({
  id,
  name,
  mass,
  image,
}: CategoryItemProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { category,filterd,count } = useSelector((state: RootState) => state.category);
      const theme:any= useTheme();
      const isDark = theme.theme === "dark";
  const handleChange = (newCount: number) => {
    if (newCount < 0) return;
    dispatch({ type:"category/AddCount", payload:{id:id,value:newCount}});
  };

  const handleDelete=async()=>{
    dispatch({ type:"category/filter", payload:{id:id}});
  }
const  srr= "https://ozcuwnfchwhgnwdincfu.supabase.co/storage/v1/object/public/youcan//youcan.jpg"
  return (
    <div className="flex dark:bg-black dark:text-white relative items-center justify-between p-2 bg-white rounded-lg shadow-sm gap-2 border-2 border-slate-500">
    < ClearIcon onClick={handleDelete} fontSize="small" className="absolute top-1 right-1 text-red-500  cursor-pointer"   />
      <div className="flex items-center gap-3">

        {image ? (
          <Image src={srr} alt={name} width={100} height={100} className="object-cover rounded-full" />
        ) : (
          <div className="w-[200px] h-[200px] bg-gray-200" /> // Fallback for missing image
        )}
        <div className="text-sm font-medium text-gray-700 flex flex-col dark:text-white">
          {name} = {mass}g
          <p>{count[id]|| 0}={Number((count[id] * mass ||0).toFixed(2))}g</p>
        </div>
      </div>

      <div className="flex items-center gap-1 dark:bg-black dark:text-white">
        <IconButton   sx={{
        color: isDark ? "white" : "black",
      }} size="small" onClick={() => handleChange((count[id]|| 0) - 1)}>
          <Remove fontSize="small" />
        </IconButton>

        <TextField
          value={count[id]|| 0}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            handleChange(val);
          }}
          sx={{
            input: {
              color: isDark ? "white" : "black",
              border: isDark ? "1px solid white" : "1px solid gray",
            },
            fieldset: {
              borderColor: isDark ? "white" : "gray",
            },
          }}
          type="number"
          inputProps={{ min: 0 }}
          size="small"
          className="w-16"
        />

        <IconButton  sx={{
        color: isDark ? "white" : "black",
      }}  size="small" onClick={() => handleChange((count[id]|| 0) + 1)}>
          <Add fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}