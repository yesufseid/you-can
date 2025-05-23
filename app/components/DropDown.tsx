"use client"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";


import {
  Checkbox,
  ListItemText,
  MenuItem,
} from "@mui/material";

type activityProps = {
    id: string;
    name: string;
    mass: number;
    image: string;
    created_at: string;
  };
export default function DropDown({filtered,setFiltered}:{filtered:activityProps[],setFiltered:React.Dispatch<React.SetStateAction<activityProps[]>>}) {
     const dispatch = useDispatch<AppDispatch>();
      const { filterd,category }=useSelector((state: RootState) => state.category); // Fixed typo
       const theme: any = useTheme();
        const isDark = theme.theme === "dark";
        useEffect(() => {
          dispatch({ type: "category/fetchCategory" });
        }, [dispatch]);
       useEffect(()=>{
           setFiltered(category)
       },[category])

        const handleToggle = (name: string) => {
            const selected = category.find((cat) => cat.name === name);
            if (selected) {
              dispatch({ type: "category/filter", payload: selected });
            }
          };
          
  return (
    <>
      {filtered.length>0&&filtered.map((cat) => (
            <MenuItem key={cat.id} value={cat.name} onClick={() => handleToggle(cat.name)}>
              <Checkbox checked={filterd.some((f) => f.name === cat.name)}
                  sx={{
                    color: isDark ? "white" : "black", // default icon color
                    "&.Mui-checked": {
                      color: isDark ? "white" : "primary", // checked color
                    },
                  }}
              />
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={40}
                  height={40}
                  className="object-cover rounded-full mr-2"
                />
              ) : (
                <div className="w-[40px] h-[40px] bg-gray-200 rounded-full mr-2" />
              )}
              <ListItemText primary={cat.name} />
              <ListItemText primary={`${cat.mass}g`} />
            </MenuItem>
          ))}
    </>
  )
}
