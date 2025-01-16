import React, { useState } from 'react';
import { Box, Button, Typography, ToggleButton, ToggleButtonGroup, Menu, MenuItem, IconButton } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useAuctionHeaderStyles from './AuctionHeaderStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQueryParam } from '../../../helper/GetQueryParam';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import CustomTextField from '../../custom-components/CustomTextField';

const AuctionHeader = ({
    headerType = 'current-auctions', // Default to 'auction'
    isCurrent,
    onToggle,
    selectedLocation,
    setSelectedLocation,
    locations,
    filterLots
}: any) => {
    const classes = useAuctionHeaderStyles();
    const navigate = useNavigate();
    const locationURL = useLocation()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleFilterChange = (location: string) => {
        setSelectedLocation((prev: any) => (prev === location ? null : location));
        handleMenuClose();
    };

    const handleAddClick = () => {
        if (headerType === "current-auctions" || headerType === "live") {
            navigate('/auction/create')
        } else {
            const selectedAuction = getQueryParam('aucId');
            navigate(`/auction/lots/create?aucId=${selectedAuction}`)
        }
    }

    return (
        <Box>
            <Typography className={classes.title}>
                {headerType === 'listings' ? "All Auction Listings"
                    : headerType === 'live' ? "Live Stream"
                        : headerType === 'watchlist' ? "Watchlist:"
                            : "Current Auction"
                }
            </Typography>
            {headerType !== "watchlist" &&
                <Box className={classes.root}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: "60%", padding: "20px 0" }}>
                        <CustomTextField
                            // value={searchTerm}
                            // onChange={handleSearchChange}
                            placeholder="Search for auction listings here..."
                            className={classes.searchField}
                            InputProps={{
                                endAdornment: (
                                    <Button variant={'contained'} className={classes.searchButton}>
                                        Search
                                    </Button>
                                ),
                            }}
                        />
                    </Box>

                    <Box className={classes.buttonContainer}>
                        <Box className={classes.toggleContainer}>
                            <ToggleButtonGroup
                                value={isCurrent ? 'current' : 'past'}
                                exclusive
                                onChange={onToggle}
                                sx={{ maxHeight: '30px' }}
                            >
                                <ToggleButton
                                    value="current"
                                    className={`${classes.toggleButton} ${isCurrent ? 'current' : 'past'}`}
                                >
                                    Current {headerType === 'lots' ? 'Lots' : 'Auctions'}
                                </ToggleButton>
                                <ToggleButton
                                    value="past"
                                    className={`${classes.toggleButton} ${!isCurrent ? 'current' : 'past'}`}
                                >
                                    Past {headerType === 'lots' ? 'Lots' : 'Auctions'}
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Button
                            variant="contained"
                            className={classes.filterButton}
                            onClick={handleMenuOpen}
                            startIcon={<FilterAltIcon />}
                        >
                            Location
                        </Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            {locations.map((location: any) => (
                                <MenuItem
                                    key={location}
                                    onClick={() => handleFilterChange(location)}
                                    className={`${classes.menuItem} ${selectedLocation === location ? 'selected' : ''}`}
                                >
                                    {location}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
            }
        </Box >
    );
};

export default AuctionHeader;
