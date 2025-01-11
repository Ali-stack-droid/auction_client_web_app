import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Link } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
    return (
        <AppBar position="static" color="default" elevation={0}
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                margin: "30px"
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ mr: 2, fontWeight: 'bold' }}>
                        Parker's Auction
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Link href="#" underline="none" color="inherit">Home</Link>
                    <Link href="#" underline="none" color="inherit">Current Auctions</Link>
                    <Link href="#" underline="none" color="inherit">Listings</Link>
                    <Link href="#" underline="none" color="inherit">My Bids</Link>
                    <Link href="#" underline="none" color="inherit">Open Invoices</Link>
                    <Link href="#" underline="none" color="inherit">Live Stream</Link>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button variant="outlined" color="primary">Login</Button>
                    <Button variant="contained" color="primary">Sign up</Button>
                    <IconButton color="default">
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton color="default">
                        <ShoppingCartIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar >
    );
};

export default Header;
