import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
    CircularProgress,
    Typography,
} from '@mui/material';
import AuctionCard from './auction-components/AuctionCard';
import AuctionHeader from './auction-components/AuctionHeader';
import PaginationButton from './auction-components/PaginationButton';
import { getCurrentAuctions, getCurrentLocations, getPastAuctions, getPastLocations } from '../Services/Methods';
import NoRecordFound from '../../utils/NoRecordFound';
import theme from '../../theme';

const CurrentAuctions = () => {
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [isFetchingData, setIsFetchingData] = useState(false);

    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [filteredData, setFilteredData]: any = useState([]); // Filtered data state
    const [paginationedData, setPaginationedData]: any = useState([]); // Filtered data state
    const [locations, setLocations]: any = useState([]); // Filtered data state

    const [searchTerm, setSearchTerm]: any = useState(""); // Filtered data state

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchAuctionData();
        }
    }, [isCurrentAuction])

    useEffect(() => {
        if (selectedLocation) {
            setPaginationedData(filteredData.filter((item: any) => item.details.address === selectedLocation))
        } else {
            setPaginationedData(filteredData)
        }
    }, [selectedLocation])

    const fetchAuctionData = async () => {
        try {
            // Critical request:
            let response;
            if (isCurrentAuction) {
                response = await getCurrentAuctions()
            } else {
                response = await getPastAuctions();
            }

            if (response.data && response.data.length > 0) {
                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    name: item.Name,
                    image: item.Image,
                    details: {
                        address: item.Address,
                        location: `${item.City}, ${item.Country}`,
                        dateRange: `${item.StartDate} to ${item.EndDate}`,
                        lotsAvailable: item.TotalLots // Replace with actual data if available
                    }
                }));
                setFilteredData(updatedData);
                setPaginationedData(updatedData)
            } else {
                setFilteredData([]);
                setPaginationedData([])
            }

            const locationResponse = isCurrentAuction
                ? await getCurrentLocations()
                : await getPastLocations();

            if (locationResponse.data && locationResponse.data.length > 0) {
                const updatedLocation = locationResponse.data;
                setLocations(updatedLocation);
            } else {
                setLocations([]);
            }


        } catch (error) {
        } finally {
            setIsFetchingData(false)
        }
    };

    // Filtered Data based on `type` and `location`
    useEffect(() => {

        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
        }, 300);
    }, [paginationedData]);


    return (
        <Box sx={{ padding: "10px 0" }}>
            <AuctionHeader
                headerType={"current-auctions"}
                isCurrent={isCurrentAuction}
                onToggle={() => {
                    if (!isFetchingData) {
                        setIsCurrentAuction((prev) => !prev)
                    }
                }}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                locations={locations}
                setSearchTerm={setSearchTerm}
            />

            <Box>
                {!isFetchingData && paginationedData?.length ?
                    <Fade in={fadeIn} timeout={300}>
                        <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                                {paginationedData
                                    .filter((auction: any) => {
                                        if (!searchTerm) return true; // Show all if no search term
                                        const lowerCaseTerm = searchTerm.toLowerCase();
                                        return (
                                            auction.id.toString().includes(searchTerm) || // Match ID
                                            auction.name.toLowerCase().includes(lowerCaseTerm) || // Match Name
                                            auction.details.address.toLowerCase().includes(lowerCaseTerm) // Match Location
                                        );
                                    })
                                    .length > 0 ? (
                                    paginationedData
                                        .filter((auction: any) => {
                                            if (!searchTerm) return true; // Show all if no search term
                                            const lowerCaseTerm = searchTerm.toLowerCase();
                                            return (
                                                auction.id.toString().includes(searchTerm) || // Match ID
                                                auction.name.toLowerCase().includes(lowerCaseTerm) || // Match Name
                                                auction.details.address.toLowerCase().includes(lowerCaseTerm) // Match Location
                                            );
                                        })
                                        .map((auction: any) => (
                                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={auction.id}>
                                                <AuctionCard
                                                    headerType={"current-auction"}
                                                    cardData={auction}
                                                    setPaginationedData={setPaginationedData}
                                                />
                                            </Grid>
                                        ))
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '50vh',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '25px', fontWeight: 700 }}>
                                            No match found for <span style={{ color: theme.palette.primary.main }}> "{searchTerm}"</span>
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Container>
                    </Fade>
                    : isFetchingData ?
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '70vh',
                                width: '100%',
                            }}
                        >
                            <CircularProgress size={70} disableShrink />
                        </Box>
                        :
                        <NoRecordFound />
                }
            </Box>

            <PaginationButton filteredData={filteredData} setPaginationedData={setPaginationedData} />

        </Box >
    );
};

export default CurrentAuctions;
