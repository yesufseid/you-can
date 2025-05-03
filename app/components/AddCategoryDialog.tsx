'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import React, { useRef, useState } from 'react';
import { useTheme } from 'next-themes'; 
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { createClient } from '@/utils/supabase/client';


interface Category {
  name: string;
  mass: number;
  image: string; // only local preview now
}

interface AddCategoryDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ open, setOpen }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newCategory, setNewCategory] = useState<Category>({
    name:'',
    mass: 0,
    image:'',
  });
  const [fileLoading,setFileLoading]=useState(false)
  const [file, setFile] = useState<File | null>(null);
  const theme: any = useTheme();
  const isDark = theme.theme === 'dark';
 const dispatch = useDispatch<AppDispatch>();
 const {loading} = useSelector((state: RootState) => state.category);
  const handleImageChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selectedFile = files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCategory((prev) => ({
        ...prev,
        image: reader.result as string, // local preview
      }));
    };
    reader.readAsDataURL(selectedFile);
  };
  const uploadImage = async (file: File) => {
    setFileLoading(true)
    const supabase = await createClient();
    const filePath = `youcan-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('youcan') // Your bucket name
      .upload(filePath, file);
  
    if (error) {
      console.error('Upload error:', error.message);
      return null;
    }
  
    const { data: publicUrlData } = supabase.storage
      .from('youcan')
      .getPublicUrl(filePath);
  
    return publicUrlData.publicUrl;
  };
  const handleCreate = async () => {
    if (!file) return;
     const publicUrl=await uploadImage(file)
     setFileLoading(false)
    if (publicUrl) {
      const categoryToSave = {
        ...newCategory,
        image:publicUrl,
      };
      dispatch({ type:"category/create", payload:categoryToSave});   
      setOpen(false);
    } else {
      console.error('Image upload failed:');
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          fullWidth
          margin="dense"
          label="Mass (grams)"
          type="number"
          value={newCategory.mass}
          onChange={(e) =>
            setNewCategory((prev) => ({ ...prev, mass: Number(e.target.value) }))
          }
        />

        {/* Upload Icon Button */}
        <div className="flex justify-center mt-4">
          <IconButton
            component="label"
            sx={{
              bgcolor: isDark ? 'grey.800' : 'grey.200',
              '&:hover': { bgcolor: isDark ? 'grey.700' : 'grey.300' },
              width: 60,
              height: 60,
            }}
          >
            <UploadIcon fontSize="large" />
            <input
              hidden
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => handleImageChange(e.target.files)}
            />
          </IconButton>
        </div>

        {/* Preview Uploaded Image */}
        {newCategory.image && (
          <>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Preview Image:
            </Typography>
            <div className="flex justify-center mt-2">
              <img
                src={newCategory.image}
                alt="preview"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: `2px solid ${isDark ? '#555' : '#ccc'}`,
                }}
              />
            </div>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          color="primary"
          disabled={!newCategory.name || !newCategory.mass || !file}
        >
          {fileLoading?"ImageUploading...":loading?"loading...":"Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
