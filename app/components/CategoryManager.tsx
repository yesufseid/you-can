"use client"
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CategoryDropdown from './CategoryDropdown';
import AddCategoryDialog from './AddCategoryDialog';
import CategoryItem from './Card';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";

interface Category {
  name: string;
  mass: number;
  image?: string;
  id:string
}



const CategoryManager: React.FC<{ onCategorySelect: (category: Category) => void }> = ({
  onCategorySelect,
}) => {
  const dispatch = useDispatch<AppDispatch>();
    const { category,filterd } = useSelector((state: RootState) => state.category);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<any>([]);
  const [filterText, setFilterText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [count,setCount]=useState({})
  // const [newCategory, setNewCategory] = useState<Category>({
  //   name: '',
  //   mass: 0,
  //   density: 0,
  //   image: '',
  // });

  // const handleCategoryChange = (names: string[]) => {
  //   setSelectedCategoryNames(names);
  //   names.forEach((name) => {
  //     const found = categories.find((cat) => cat.name === name);
  //     if (found) onCategorySelect(found);
  //   });
  // };

  // const handleCreateCategory = (cat: Category) => {
  //   setCategories([...categories, cat]);
  //   setDialogOpen(false);
  //   setNewCategory({ name: '', volume: 0, density: 0, image: '' });
  // };
// 
  // const selectedCategories = categories.filter((cat) => selectedCategoryNames.includes(cat.name));

  return (
    <div>
      <Typography variant="h6">Select Categories</Typography>
      <CategoryDropdown onChange={setSelectedCategoryNames} />
      <div>
        <h1>hellow</h1>
        {filterd.map((cat:Category)=>{
            <div className='bg-slate-500 w-52 h-40'>
             <CategoryItem  
             key={cat.id}
             name={cat.name}
             mass={cat.mass}
             image={cat.image}
             setCount={setCount}
             count={count}
             />
             </div>
        })}
      </div>
     












      {/* <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)} sx={{ mt: 2 }}>
        Add New Category
      </Button> */}


      {/* <AddCategoryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={handleCreateCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
      /> */}
    </div>
  );
};

export default CategoryManager;
