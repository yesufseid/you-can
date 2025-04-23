"use client"
import { useState } from "react";
import { Button, Typography } from "@mui/material";

interface FileUploadProps {
    onImageSelect: (imageUrl: string) => void;
}

export default function FileUpload({ onImageSelect }: FileUploadProps) {
    const [image, setImage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            onImageSelect(imageUrl);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", border: "2px dashed gray", borderRadius: "8px" }}>
            <input type="file" id="upload" accept="image/*" hidden onChange={handleFileChange} />
            <label htmlFor="upload">
                <Button variant="contained" component="span">
                    Choose Image
                </Button>
            </label>
            {image && <img src={image} alt="Uploaded" style={{ marginTop: "10px", maxWidth: "200px", borderRadius: "8px" }} />}
        </div>
    );
}
