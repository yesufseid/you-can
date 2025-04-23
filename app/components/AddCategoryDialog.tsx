'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import { createClient } from '../../utils/supabase/client'; // adjust the import path

interface Category {
  name: string;
  mass: number;
  image: string[];
}

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (category: Category) => void;
  newCategory: Category;
  setNewCategory: (category: Category) => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  open,
  onClose,
  onCreate,
  newCategory,
  setNewCategory,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const filePath = `${Date.now()}-${file.name}`;
      const { error } = await createClient.storage
        .from('category-images')
        .upload(filePath, file);

      if (!error) {
        const { data } = createClient.storage
          .from('category-images')
          .getPublicUrl(filePath);
        uploadedUrls.push(data.publicUrl);
      } else {
        console.error('Image upload failed:', error.message);
      }
    }

    setNewCategory({
      ...newCategory,
      image: [...newCategory.image, ...uploadedUrls],
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <TextField
          fullWidth
          margin="dense"
          label="Mass (grams)"
          type="number"
          value={newCategory.mass}
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              mass: parseFloat(e.target.value) || 0,
            })
          }
        />

        <Button
          fullWidth
          variant="outlined"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload Images
          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        </Button>

        {newCategory.image.length > 0 && (
          <>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Uploaded Images:
            </Typography>
            {newCategory.image.map((imgUrl, i) => (
              <img
                key={i}
                src={imgUrl}
                alt={`uploaded-${i}`}
                style={{ width: 80, height: 80, objectFit: 'cover', margin: 4 }}
              />
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => onCreate(newCategory)}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
