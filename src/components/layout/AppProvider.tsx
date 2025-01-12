import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import Header from './header/Header'; // Import your Header component
import { useLocation } from 'react-router-dom';

const AppProvider = ({ children }: any) => {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Main content area */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: 'linear-gradient(to bottom, rgba(47, 131, 233, 0.2), rgba(47, 131, 233, 0))',
                    backgroundSize: '100% 45%', // Restricts the gradient to 50% height
                    backgroundRepeat: 'no-repeat', // Ensures it doesn’t repeat
                    backgroundPosition: 'top', // Keeps the gradient at the top
                    position: 'relative', // To allow layering content over the background
                }}
            >
                <Box sx={{ padding: "40px 80px", backgroundColor: location.pathname === '/home' ? 'transparent' : 'white' }}>
                    {/* Header on top */}
                    <Header />

                </Box>
                {/* Content area below the header */}
                <Box id="childContainer" sx={{ flex: 1, overflowY: 'auto', padding: "0 80px", }}>
                    {React.cloneElement(children, { searchTerm })}
                </Box>
            </Box>
        </Box>
    );
};

export default AppProvider;
