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
 

  



  return (
    <Container>
     <VolumeCalculater />
    </Container>
  );
}
