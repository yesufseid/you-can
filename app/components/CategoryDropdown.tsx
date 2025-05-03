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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { useTheme } from "next-themes";
import Image from "next/image";
import DropDown from "./DropDown";

type activityProps = {
  id: string;
  name: string;
  mass: number;
  image: string;
  created_at: string;
};

const MenuWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
}));

const CategoryDropdown = () => {
  const { category, filterd,loading,error } = useSelector((state: RootState) => state.category);
  const [filterText, setFilterText] = useState("");
  const [filtered, setFiltered] = useState<activityProps[]>([]);
  const [open, setOpen] = useState(false);

  const theme: any = useTheme();
  const isDark = theme.theme === "dark";

  const handleFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setFilterText(text);
    const data = category.filter((cat) =>
      cat.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(data);
  };

 

  return (
    <Select
      fullWidth
      multiple
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => {
        setOpen(false);
        setFilterText(""); // Reset search when closed
        setFiltered(category);
      }}
      value={filterd.map((t) => t.name)}
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
          style: { maxHeight: 350 },
        },
        MenuListProps: {
          disablePadding: true,
        },
      }}
    >
      <MenuWrapper>
      <TextField
  fullWidth
  value={filterText}
  placeholder="Filter by name..."
  onChange={handleFilterText}
  onClick={(e) => e.stopPropagation()}
  onKeyDown={(e) => e.stopPropagation()}
  size="small"
  sx={{
    input: {
      color: isDark ? "white" : "black",
    },
    fieldset: {
      borderColor: isDark ? "white" : "gray",
    },
  }}
/>
      </MenuWrapper>

     <DropDown filtered={filtered} setFiltered={setFiltered} />
      {loading&&<p>Loading ...</p>}
      {filtered.length === 0 && (
        <MenuItem disabled>
          No categories found
        </MenuItem>
      )}
    </Select>
  );
};

export default CategoryDropdown;
