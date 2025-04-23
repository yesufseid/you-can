'use client'
import { Card, CardContent, Typography } from "@mui/material";

interface WasteResultProps {
    result: { wasteType: string; estimatedWeight: string } | null;
}

export default function WasteResult({ result }: WasteResultProps) {
    if (!result) return null;

    return (
        <Card sx={{ maxWidth: 400, mt: 3, p: 2 }}>
            <CardContent>
                <Typography variant="h6">Classification Result</Typography>
                <Typography variant="body1"><strong>Waste Type:</strong> {result.wasteType}</Typography>
                <Typography variant="body1"><strong>Estimated Weight:</strong> {result.estimatedWeight}</Typography>
            </CardContent>
        </Card>
    );
}
