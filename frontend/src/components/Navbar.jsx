import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        URL Shortener
      </Typography>
      <Box>
        <Button color="inherit" component={Link} to="/">Shorten</Button>
        <Button color="inherit" component={Link} to="/stats">Stats</Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
