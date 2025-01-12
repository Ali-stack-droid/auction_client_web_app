import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Box, Link, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation } from 'react-router-dom';
import useHeaderStyles from './HeaderStyles';
import theme from '../../../theme';

const Header = () => {
    const location = useLocation(); // Get the current pathname
    const classes = useHeaderStyles();

    const navLinks = [
        { label: 'Home', path: '/home' },
        { label: 'Current Auctions', path: '/current-auctions' },
        { label: 'Listings', path: '/listings' },
        { label: 'My Bids', path: '/my-bids' },
        { label: 'Open Invoices', path: '/open-invoices' },
        { label: 'Live Stream', path: '/live-stream' },
    ];

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
                backgroundColor: 'white',
                boxShadow: 'none',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '10px 0',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/svgs/logo.svg`}
                        alt="Parker's Auction"
                        style={{ width: '15%', padding: '0 10px' }}
                    />
                    {/* Navigation Links */}
                    <Box className={classes.navLinks}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                underline="none"
                                sx={{
                                    color:
                                        location.pathname === link.path
                                            ? theme.palette.primary.main
                                            : theme.palette.primary.main1,
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button variant="outlined" color="primary" sx={{ width: "120px", textTransform: 'none' }}>
                        Login
                    </Button>
                    <Button variant="contained" color="primary" sx={{ width: "120px", textTransform: 'none' }}>
                        Sign up
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                        <IconButton sx={{ color: "black" }}>
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton sx={{ color: "black" }}>
                            <ShoppingCartIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
