import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import Header from './header/Header'; // Import your Header component

const AppProvider = ({ children }: any) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Main content area */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
                <Box sx={{ padding: "40px 80px", backgroundColor: 'white' }}>
                    {/* Header on top */}
                    <Header />

                </Box>
                {/* Content area below the header */}
                <Box id="childContainer" sx={{ flex: 1, overflowY: 'auto', backgroundColor: '#2F83E908', padding: "20px 80px", }}>
                    {React.cloneElement(children, { searchTerm })}
                </Box>
            </Box>
        </Box>
    );
};

export default AppProvider;
