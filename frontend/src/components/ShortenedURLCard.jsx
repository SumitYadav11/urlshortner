import React from "react";
import { Card, CardContent, Typography, Link } from "@mui/material";

const ShortenedURLCard = ({ originalUrl, shortLink, expiry }) => {
  // Defensive check to prevent crashing
  if (!originalUrl || !shortLink || !expiry) return null;

  return (
    <Card sx={{ mb: 2, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Original URL:
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {originalUrl}
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          Shortened URL:
        </Typography>
        <Link href={shortLink} target="_blank" rel="noopener">
          {shortLink}
        </Link>

        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Expiry:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {expiry}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShortenedURLCard;
