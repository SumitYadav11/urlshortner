import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';

const StatsTable = ({ data }) => {
  const clicks = data?.clicks || [];

  if (!Array.isArray(clicks) || clicks.length === 0) {
    return (
      <Typography variant="body2" sx={{ mt: 2 }}>
        No click data available.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Referrer</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clicks.map((click, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
              <TableCell>{click.referrer || "N/A"}</TableCell>
              <TableCell>{click.location || "Unknown"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
