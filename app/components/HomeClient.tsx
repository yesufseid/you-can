// src/components/HomeClient.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Container, Typography, TextField, MenuItem, Button, Box, CircularProgress } from "@mui/material";
import { detectObjects, loadModel } from "../../utils/tensorflow";
import  VolumeCalculater from "./VolumeCalculater"



export default function HomeClient() {
  const [type, setType] = useState("bottle");
  const [count, setCount] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ count: number; totalWeight: number } | null>(null);

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files?.[0]) return;
  //   const file = e.target.files[0];
  //   const imageUrl = URL.createObjectURL(file);
  //   setImage(imageUrl);
  //   setLoading(true);

  //   await loadModel();
  //   const img = new Image();
  //   img.src = imageUrl;
  //   img.onload = async () => {
  //     const detected = await detectObjects(img, type);
  //     const avgWeight = PLASTIC_TYPES.find((t) => t.value === type)?.weight || 0;
  //     setResult({ count: detected, totalWeight: parseFloat((detected * avgWeight).toFixed(2)) });
  //     setLoading(false);
  //   };
  // };

  // const handleManualCount = () => {
  //   if (count !== null) {
  //     const avgWeight = PLASTIC_TYPES.find((t) => t.value === type)?.weight || 0;
  //     setResult({ count, totalWeight: parseFloat((count * avgWeight).toFixed(2)) });
  //   }
  // };

  return (
    <Container>
     <VolumeCalculater />

      {/* <TextField
        fullWidth
        label="Enter Count (if known)"
        type="number"
        value={count ?? ""}
        onChange={(e) => setCount(parseInt(e.target.value))}
        sx={{ mb: 2 }}
      /> */}

     
{/* 
      <Button fullWidth component="label" variant="outlined">
        Or Upload Image to Estimate Count
        <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
      </Button> */}

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {result && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6">Estimated Count: {result.count}</Typography>
          <Typography variant="h6">Estimated Weight: {result.totalWeight} kg</Typography>
        </Box>
      )}
    </Container>
  );
}
