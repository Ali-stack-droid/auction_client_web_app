import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
    CircularProgress,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomDialogue from '../custom-components/CustomDialogue';
import AuctionCard from '../auction/auction-components/AuctionCard';
import AuctionHeader from '../auction/auction-components/AuctionHeader';
import PaginationButton from '../auction/auction-components/PaginationButton';
import { deleteAuction, getCurrentLiveAuctions } from '../Services/Methods';
import NoRecordFound from '../../utils/NoRecordFound';
import { ErrorMessage, SuccessMessage } from '../../utils/ToastMessages';
import theme from '../../theme';


const LiveStreaming = () => {
    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteAuctionId, setDeleteAuctionId] = useState<string | null>(null);

    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [filteredData, setFilteredData] = useState([]); // Filtered data state
    const [paginationedData, setPaginationedData]: any = useState([]); // Filtered data state

    const [searchTerm, setSearchTerm]: any = useState(""); // Filtered data state

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchLiveStreamingData();
        }
    }, [isCurrentAuction])

    const fetchLiveStreamingData = async () => {
        try {
            const response = await getCurrentLiveAuctions()
            if (response.data && response.data.length > 0) {
                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    name: item.Name,
                    image: item.Image,
                    description: item.Description,
                    isLive: item.LiveStreaming,
                    details: {
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
            setIsFetchingData(false)

        } catch (error) {
            console.error('Error fetching auction data:', error);
            setIsFetchingData(false)
        }
    };

    const handleDelete = async (id: string) => {
        try {
            // Call the delete API
            const response: any = await deleteAuction(id);
            if (response.status === 200) {
                SuccessMessage('Auction deleted successfully!')
                // Update state with filtered data if API call is successful
                const updatedData = filteredData.filter((auction: any) => auction.id !== id);
                setFilteredData(updatedData);
            } else {
                ErrorMessage('Error deleting auction!')
            }
        } catch (error) {
            console.error('Error deleting auction:', error);
        } finally {
            handleCloseModal();
        }
    };


    // Open confirmation modal
    const handleDeleteAuction = (id: string) => {
        setDeleteAuctionId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        if (!isDeleting) {
            setIsDeleting(false)
            setConfirmDelete(false);
            setDeleteAuctionId(null);
        }
    };


    // Filtered Data based on `type` and `location`
    useEffect(() => {

        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
            // setFilteredData(liveStreamData);
        }, 200);
    }, []);


    return (
        <Box>
            <AuctionHeader
                headerType={"live"}
                isCurrent={isCurrentAuction}
                onToggle={() => setIsCurrentAuction((prev) => !prev)}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                locations={[]}
                setSearchTerm={setSearchTerm}
            />
            <Box sx={{ minHeight: "70vh" }}>
                {!isFetchingData && paginationedData?.length ?
                    <Fade in={fadeIn} timeout={200}>
                        <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                            <Grid container spacing={3}>

                                {paginationedData
                                    .filter((auction: any) => {
                                        if (!searchTerm) return true; // Show all if no search term
                                        const lowerCaseTerm = searchTerm.toLowerCase();
                                        return (
                                            auction.id.toString().includes(searchTerm) || // Match ID
                                            auction.name.toLowerCase().includes(lowerCaseTerm) || // Match Name
                                            auction.details.location.toLowerCase().includes(lowerCaseTerm) // Match Location
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
                                                auction.details.location.toLowerCase().includes(lowerCaseTerm) // Match Location
                                            );
                                        })
                                        .map((auction: any) => (
                                            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={auction.id}>
                                                <AuctionCard
                                                    headerType={"live"}
                                                    cardData={auction}
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

        </Box>
    );
};

export default LiveStreaming;
