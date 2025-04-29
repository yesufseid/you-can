"use client"
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import {Box, CircularProgress } from "@mui/material";
import { detectObjects, loadModel } from "../../utils/tensorflow";
import {
  IconButton,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';


export default function FileUpload() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(0);

   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setLoading(true);

    await loadModel();
    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      const detected = await detectObjects(img);
      setResult(detected);
      setLoading(false);
    };
  };

    return (
        <div className="lg:mx-40 mx-2">    
        <div style={{ textAlign: "center", padding: "20px", border: "2px dashed gray", borderRadius: "8px" }}>
               <div className="flex justify-center mt-4">
                      <IconButton
                        component="label"
                        sx={{
                          bgcolor:'grey.800',
                          '&:hover':'grey.700',
                          width: 60,
                          height: 60,
                        }}
                      >
                        <UploadIcon fontSize="large" />
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </IconButton>
                    </div>
            {image && <img src={image} alt="Uploaded" style={{ marginTop: "10px", maxWidth: "200px", borderRadius: "8px" }} />}
        </div>
        {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {result && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6">Estimated Weight: {result} g</Typography>
        </Box>
      )}
        </div>
    );
}
