"use client";

import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { useTheme } from "next-themes";
import Image from "next/image";



const MenuWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
}));
type activityProps={
  id:string
  name:string,
  mass:number,
  image:string ,
  created_at:string
}

const CategoryDropdown = ({ onChange }: { onChange:React.Dispatch<any>}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { category,filterd } = useSelector((state: RootState) => state.category);
  const [filterText, setFilterText] = useState("");
  const [filtered, setFilteredText] = useState<any[]>([]);

  const theme:any= useTheme();
  const isDark = theme.theme === "dark";

  useEffect(() => {
    dispatch({ type: "category/fetchCategory" });
  }, [dispatch]);

  const HandleFilterText=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const text=e.target.value
    setFilterText(text)
    if(filterText==="") setFilteredText(category)    

    const data:any=category.filter((cat) =>
          cat.name.toLowerCase().includes(text.toLowerCase())
        )
    setFilteredText(data)    
  }

  const handleToggle = (name: string) => {
    const data=category.filter((cat)=>cat.name===name)
    dispatch({ type:"category/filter", payload:data[0]});

  };
  const  srr= "https://ozcuwnfchwhgnwdincfu.supabase.co/storage/v1/object/public/youcan//youcan.jpg"

  return (
    <Select
      fullWidth
      multiple
      value={filterd.map((t)=>t.name)}
      input={<OutlinedInput />}
      renderValue={(selected) => (selected as string[]).join(", ")}
      sx={{
        color: isDark ? "white" : "black",
        border: isDark ? "1px solid white" : "1px solid gray",
        bgcolor: isDark ? "black" : "white",
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: isDark ? "black" : "white",
            color: isDark ? "white" : "black",
          },
          style: { maxHeight: 300 },
        },
        MenuListProps: { disablePadding: true },
      }}
    >
      <MenuWrapper>
        <TextField
          fullWidth
          value={filterText}
          placeholder="Filter by name..."
          onChange={(e) =>HandleFilterText(e)}
          size="small"
          sx={{
            input: {
              color: isDark ? "white" : "black",
              border: isDark ? "1px solid white" : "1px solid gray",
            },
            fieldset: {
              borderColor: isDark ? "white" : "gray",
            },
          }}
        />
      </MenuWrapper>

      {filtered.map((cat:activityProps,index) => (
        <MenuItem key={index} value={cat.name} onClick={() => handleToggle(cat.name)}>
          <Checkbox checked={filterd.includes(cat)} />
           {cat.image ? (
                    <Image src={srr} alt={cat.name} width={50} height={50} className="object-cover rounded-full mr-3" />
                  ) : (
                    <div className="w-[50px] h-[50px] bg-gray-200" /> // Fallback for missing image
                  )}
          <ListItemText
            primary={`${cat.name}`}
          />
          <ListItemText
            primary={`${cat.mass}g`}
          />
        </MenuItem>
      ))}

      {filtered.length === 0 && <MenuItem disabled>No categories found</MenuItem>}
    </Select>
  );
};

export default CategoryDropdown;
