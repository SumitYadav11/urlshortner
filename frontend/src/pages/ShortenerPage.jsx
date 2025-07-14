import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import ShortenerForm from "../components/ShortenerForm";
import ShortenedURLCard from "../components/ShortenedURLCard";
import { fetchAllUrls } from "../services/api";

const ShortenerPage = () => {
  const [allUrls, setAllUrls] = useState([]);

  useEffect(() => {
    fetchAllUrls()
      .then((data) => {
        // Only keep valid records
        const validData = data.filter(
          (url) => url?.shortcode && url?.originalUrl && url?.expiry
        );
        setAllUrls(validData);
      })
      .catch((err) => console.error("Failed to load URLs:", err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        URL Shortener
      </Typography>

      <ShortenerForm setAllUrls={setAllUrls} />

      {allUrls.length > 0 && (
        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            🔗 Previously Created Short Links:
          </Typography>

          {allUrls.map((url) => (
            <ShortenedURLCard
              key={url.shortcode}
              originalUrl={url.originalUrl}
              shortLink={`http://localhost:5000/${url.shortcode}`}
              expiry={new Date(url.expiry).toLocaleString()}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ShortenerPage;
