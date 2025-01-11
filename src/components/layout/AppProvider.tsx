import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import Header from './header/Header'; // Import your Header component

const AppProvider = ({ children }: any) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Main content area */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: "15px 40px", backgroundColor: '#2F83E908' }}>
                {/* Header on top */}
                <Header />

                {/* Content area below the header */}
                <Box id="childContainer" sx={{ flex: 1, overflowY: 'auto', padding: 1, }}>
                    {React.cloneElement(children, { searchTerm })}
                </Box>
            </Box>
        </Box>
    );
};

export default AppProvider;
