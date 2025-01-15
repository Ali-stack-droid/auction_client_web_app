import React, { useState } from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import Header from './header/Header'; // Import your Header component
import { Link, useLocation } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

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

                {/* Footer on bottom */}

                <Box
                    sx={{
                        backgroundColor: '#012868',
                        padding: '95px 120px 25px 120px',
                    }}
                >
                    <Box sx={{
                        color: '#ffffff', display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'flex-start',
                        alignItems: { xs: 'flex-start', sm: 'flex-start' },
                        gap: { xs: 8, sm: 4, md: 20 },
                    }}>
                        {/* Left Section: Logo and Description */}
                        <Box sx={{ maxWidth: '366px' }}>
                            <Typography sx={{ fontWeight: '600', fontSize: '24px', marginBottom: '18px', color: '#ffffff' }}>
                                Logo
                            </Typography>
                            <Typography mb={'16px'} variant="body2" sx={{ lineHeight: 1.8, fontSize: '16px', fontWeight: 400 }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec risus feugiat lectus
                                risus sed ullamcorper. Auctor semper fermentum
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.8, fontSize: '16px', fontWeight: 400 }}>
                                volutpat integer vel. In rhoncus
                                elementum nunc, malesuada mi sed. Nibh est sit lobortis id semper.
                            </Typography>
                        </Box>

                        {/* Middle Section: Useful Links */}
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '24px', marginBottom: '18px', color: '#ffffff' }}>
                                Useful Links
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                    Auctions
                                </a>
                                <a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                    View Catalog
                                </a>
                                <a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                    Testimonial
                                </a>
                                <a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>
                                    Features
                                </a>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Section: Social Icons */}
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <Box sx={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <IconButton sx={{ color: '#ffffff' }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#ffffff' }}>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#ffffff' }}>
                                <TwitterIcon />
                            </IconButton>
                        </Box>

                    </Box>
                    <Divider sx={{ backgroundColor: '#ffffff' }} />
                    <Typography mt={3} variant="body2" sx={{ fontSize: '16px', fontWeight: 400, textAlign: 'center', color: '#ffffff' }}>
                        © 2022 All Right Reserved
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AppProvider;
