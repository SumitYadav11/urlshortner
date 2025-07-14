import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { createShortUrl } from "../services/api";
import ShortenedURLCard from "./ShortenedURLCard";

const ShortenerForm = ({ setAllUrls }) => {
  const [urlInputs, setUrlInputs] = useState([
    { url: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urlInputs];
    updated[index][field] = value;
    setUrlInputs(updated);
  };

  const handleAddInput = () => {
    if (urlInputs.length < 5) {
      setUrlInputs([
        ...urlInputs,
        { url: "", validity: "", shortcode: "" },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const output = [];

    for (const input of urlInputs) {
      const payload = {
        url: input.url,
      };
      if (input.validity) payload.validity = parseInt(input.validity);
      if (input.shortcode) payload.shortcode = input.shortcode;

      try {
        const res = await createShortUrl(payload);
        const newShortUrl = {
          originalUrl: input.url,
          shortLink: res.data.shortLink,
          expiry: res.data.expiry,
        };

        output.push(newShortUrl);
        if (setAllUrls) {
          setAllUrls((prev) => [
            {
              originalUrl: input.url,
              shortcode: res.data.shortLink.split("/").pop(),
              expiry: res.data.expiry,
            },
            ...prev,
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    setResults(output);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {urlInputs.map((input, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Long URL"
                  fullWidth
                  value={input.url}
                  onChange={(e) =>
                    handleChange(idx, "url", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Validity (mins)"
                  fullWidth
                  value={input.validity}
                  onChange={(e) =>
                    handleChange(idx, "validity", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Custom Shortcode"
                  fullWidth
                  value={input.shortcode}
                  onChange={(e) =>
                    handleChange(idx, "shortcode", e.target.value)
                  }
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Box mt={2}>
          {urlInputs.length < 5 && (
            <Button onClick={handleAddInput}>+ Add Another</Button>
          )}
        </Box>
        <Box mt={2}>
          <Button type="submit" variant="contained">
            Shorten URLs
          </Button>
        </Box>
      </form>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Shortened Links:</Typography>
          {results.map((result, index) => (
            <ShortenedURLCard
              key={index}
              originalUrl={result.originalUrl}
              shortLink={result.shortLink}
              expiry={new Date(result.expiry).toLocaleString()}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default ShortenerForm;
