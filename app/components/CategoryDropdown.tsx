"use client";

import {
  Avatar,
  Checkbox,
  ListItemAvatar,
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

interface Category {
  name: string;
  volume: number;
  density: number;
  image?: string;
}

const MenuWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
}));


const CategoryDropdown = ({ onChange }: { onChange:React.Dispatch<any>}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { category,filterd } = useSelector((state: RootState) => state.category);
  const [filterText, setFilterText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch({ type: "category/fetchCategory" });
  }, [dispatch]);

  const filtered = useMemo(
    () =>
      category.filter((cat) =>
        cat.name.toLowerCase().includes(filterText.toLowerCase())
      ),
    [category, filterText]
  );
  // Memoize checked categories for onChange
  const checkedCategories = useMemo(
    () => category.filter((cat) => selectedCategories.includes(cat.name)),
    [category, selectedCategories]
  );

  // Call onChange when checked categories change
  useEffect(() => {

    onChange(checkedCategories);
  }, [checkedCategories, onChange]);
  const handleToggle = (name: string) => {
    const data=category.filter((cat)=>cat.name===name)
    const newSelected = selectedCategories.includes(name)
      ? selectedCategories.filter((item) => item !== name)
      : [...selectedCategories, name];
    setSelectedCategories(newSelected);
    dispatch({ type: "category/filter", payload:data});
  };

  return (
    <Select
      fullWidth
      multiple
      value={selectedCategories}
      input={<OutlinedInput />}
      renderValue={(selected) => (selected as string[]).join(", ")}
      MenuProps={{
        PaperProps: { style: { maxHeight: 300 } },
        MenuListProps: { disablePadding: true },
      }}
    >
      <MenuWrapper>
        <TextField
          fullWidth
          placeholder="Filter by name..."
          onChange={(e) => setFilterText(e.target.value)}
          size="small"
        />
      </MenuWrapper>

      {filtered.map((cat, index) => (
        <MenuItem key={index} value={cat.name} onClick={() => handleToggle(cat.name)}>
          <Checkbox checked={selectedCategories.includes(cat.name)} />
          <ListItemAvatar>
            <Avatar src={cat.image} sx={{ width: 28, height: 28, mr: 1 }} />
          </ListItemAvatar>
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
