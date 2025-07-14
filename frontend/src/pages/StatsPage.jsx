import React, { useEffect, useState } from "react";
import { Typography, Container, Paper, Box } from "@mui/material";
import { fetchAllStats } from "../services/api";
import StatsTable from "../components/StatsTable";

const StatsPage = () => {
  const [allStats, setAllStats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchAllStats();
        setAllStats(res.data);
      } catch (err) {
        setError("Failed to load statistics");
      }
    };

    loadStats();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>All URL Statistics</Typography>
      {error && <Typography color="error">{error}</Typography>}

      {allStats.map((url, index) => (
        <Paper key={index} sx={{ mb: 3, p: 2 }}>
          <Typography><strong>Short Link:</strong> http://localhost:5000/{url.shortcode}</Typography>
          <Typography><strong>Original URL:</strong> {url.originalUrl}</Typography>
          <Typography><strong>Created:</strong> {new Date(url.createdAt).toLocaleString()}</Typography>
          <Typography><strong>Expiry:</strong> {new Date(url.expiry).toLocaleString()}</Typography>
          <Typography><strong>Click Count:</strong> {url.clickCount}</Typography>

          {url.clicks && url.clicks.length > 0 && (
            <Box mt={1}>
              <Typography variant="subtitle1">Clicks:</Typography>
              <ul>
                {url.clicks.map((click, idx) => (
                  <li key={idx}>
                    {new Date(click.timestamp).toLocaleString()} — {click.referrer || "Direct"} — {click.location || "Unknown"}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Paper>
      ))}
    </Container>
  );
};

export default StatsPage;
