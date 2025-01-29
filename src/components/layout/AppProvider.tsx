import React, { useState } from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import Header from './components/Header'; // Import your Header component
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import { useAppProviderStyles } from './AppProviderStyles';

const AppProvider = ({ children }: any) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/home';
    const classes: any = useAppProviderStyles({ isHomePage });

    return (
        <Box sx={{ display: 'flex' }}>
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <Header />
                </Box>

                <Box id="childContainer" className={classes.childContainer}>
                    {children}
                </Box>

                <Footer />
            </Box>
        </Box>
    );
};

export default AppProvider;
