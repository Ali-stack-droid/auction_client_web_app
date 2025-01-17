import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Box, Typography, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useHeaderStyles from './HeaderStyles';
import theme from '../../../theme';
import CustomNavLink from '../../custom-components/CustomNavLink';

const Header = () => {
    const location = useLocation(); // Get the current pathname
    const classes = useHeaderStyles();
    const navigate = useNavigate();

    const navLinks = [
        { label: 'Home', path: '/home' },
        { label: 'Current Auctions', path: '/current-auctions' },
        { label: 'Listings', path: '/listings' },
        { label: 'My Bids', path: '/bids' },
        { label: 'Open Invoices', path: '/invoices' },
        { label: 'Live Stream', path: '/live' },
    ];

    const isSelected = (path: string) => {

        if (path === "/current-auctions" || path === "/live" || path === "/listings") {
            return location.pathname.replace(/\/+$/, '').includes(path);
        }
        return path === location.pathname;
    }

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
                        style={{ width: '12%', padding: '0 10px' }}
                    />
                    {/* Navigation Links */}
                    <Box className={classes.navLinks}>
                        {navLinks.map((link) => (
                            <CustomNavLink
                                isSelected={isSelected(link.path)}
                                key={link.path}
                                to={link.path}
                            >
                                {link.label}
                            </CustomNavLink>
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Watchlist">
                            <IconButton sx={{ color: "black" }} onClick={() => navigate('/watchlist')}>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cart">
                            <IconButton sx={{ color: "black" }}>
                                <ShoppingCartIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
