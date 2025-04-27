'use client';

import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCategoryDialog from './AddCategoryDialog';
import { useState } from 'react';

export default function AddCat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {/* Floating Action Button inside a Tooltip */}
      <Tooltip title="Add Category" arrow>
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            bgcolor: 'primary.main',
            color: 'white',
            width: 60,
            height: 60,
            borderRadius: '50%',
            boxShadow: 3,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      {/* Dialog */}
      <AddCategoryDialog open={open} setOpen={setOpen} />
    </div>
  );
}
