import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomDialogue from '../custom-components/CustomDialogue';
import { deleteLot, getInventoryLots, getWatchlist } from '../Services/Methods';

import NoRecordFound from '../../utils/NoRecordFound';
import { ErrorMessage, SuccessMessage } from '../../utils/ToastMessages';
import AuctionCard from '../auction/auction-components/AuctionCard';
import AuctionHeader from '../auction/auction-components/AuctionHeader';
import PaginationButton from '../auction/auction-components/PaginationButton';
import Cookies from 'js-cookie';


const Lots = () => {
    const [isCurrentLot, setIsCurrentLot] = useState(true); // Toggle between Current and Past Lots
    const [filterLots, setFilterLots] = useState('all');
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location

    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteLotId, setDeleteLotId] = useState(0);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [filteredData, setFilteredData]: any = useState([]); // Filtered data state
    const [paginationedData, setPaginationedData]: any = useState([]); // Filtered data state
    // const selectedAuction = useSelector((state: RootState) => state.auction.selectedAuction);
    const [searchTerm, setSearchTerm]: any = useState(""); // Filtered data state

    const [favouriteLots, setFavouriteLots]: any = useState([]);

    const user: any = sessionStorage.getItem('authToken') || Cookies.get('user');
    const clientId = (sessionStorage.getItem('authToken') ?
        JSON.parse(user).id : Cookies.get('user')
            ? JSON.parse(user).id : '')

    useEffect(() => {

        const fetchWatchlist = async () => {

            try {
                // Critical request:
                const response = await getWatchlist(clientId)
                if (response.data && response.data.length > 0) {
                    const allLots = response.data.map((item: any) => item.Lots);

                    const updatedData = allLots.map((item: any) => ({
                        id: item.Id,
                        name: item.Name,
                        image: item.Image,
                        date: `${item.StartDate} to ${item.EndDate}`,
                        time: `${item.StartTime} to ${item.EndTime}`,
                        details: {
                            location: `${item.City}, ${item.Country}`,
                            dateRange: `${item.StartDate} to ${item.EndDate}`,
                            lotsAvailable: item.TotalLots // Replace with actual data if available
                        }
                    }));
                    setFavouriteLots(updatedData);
                } else {
                    setFavouriteLots([]);
                }

            } catch (error) {
                console.error('Error fetching auction data:', error);
            }
        };
        fetchWatchlist();

    }, [])

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchLotsData();
        }
    }, [filterLots])

    const fetchLotsData = async () => {
        try {
            const response = await getInventoryLots();

            if (response.data && response.data.length > 0) {
                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    lotNumber: item.LotNo,
                    name: item.ShortDescription,
                    description: item.LongDescription,
                    countDown: "N/A",
                    location: "N/A",
                    image: item.Image,
                    type: "current",
                    highestBid: item.BidStartAmount,
                    sold: item.IsSold,
                    isPast: item.IsPast,
                    details: {
                        description: item.LongDescription,
                        date: `${item.StartDate} to ${item.EndDate}`,
                        time: `${item.StartTime} to ${item.EndTime}`,
                        orderNumber: item.OrderNo,
                        lot: item.LotNo,
                        category: item.Category,
                        subCategory: item.SubCategory,
                        winner: {
                            email: "N/A", // Replace with actual data if available
                            phone: "N/A", // Replace with actual data if available
                            location: "N/A", // Replace with actual data if available
                        },
                    },
                }));

                // Filter data based on isCurrentLot condition
                let latestData = [];

                if (filterLots !== 'all') {
                    latestData = updatedData.filter((lot: any) => {
                        if (filterLots === 'current') {
                            return !lot.isPast; // Keep only current lots
                        } else {
                            return lot.isPast; // Keep only past lots
                        }
                    });
                    setFilteredData(latestData);
                    setPaginationedData(latestData);
                } else {
                    setFilteredData(updatedData);
                    setPaginationedData(updatedData);
                }

            } else {
                setFilteredData([]);
                setPaginationedData([]);
            }
            setIsFetchingData(false);
        } catch (error) {
            console.error('Error fetching auction data:', error);
            setIsFetchingData(false);
        }
    };


    // Filtered Data based on `type` and `location`
    useEffect(() => {
        setFadeIn(false);
        setTimeout(() => {
            setFadeIn(true);
        }, 200);
    }, [isCurrentLot, selectedLocation, paginationedData]);

    const handleToggle = (e: any) => {
        setFilterLots(e.target.value)
    }

    const isFaverited = (lotId: any) => {
        return favouriteLots.some((lot: any) => lot.id === lotId);
    }


    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"inventory"}
                isCurrent={isCurrentLot}
                onToggle={handleToggle}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                locations={[]}
                filterLots={filterLots}
                setSearchTerm={setSearchTerm}
            />
            <Box sx={{ minHeight: "500px" }}>
                {!isFetchingData && paginationedData?.length ?
                    <Box>
                        <Fade in={fadeIn} timeout={200}>
                            <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                                <Grid container spacing={3}>
                                    {paginationedData && paginationedData
                                        .filter((auction: any) => {
                                            if (!searchTerm) return true; // Show all if no search term
                                            const lowerCaseTerm = searchTerm.toLowerCase();
                                            return (
                                                auction.id.toString().includes(searchTerm) || // Match ID
                                                auction.name.toLowerCase().includes(lowerCaseTerm) || // Match Name
                                                auction.details.location.toLowerCase().includes(lowerCaseTerm) // Match Location
                                            );
                                        }).map((lot: any) => (
                                            <Grid item xs={12} sm={6} md={4} xl={3} key={lot.id}>
                                                <AuctionCard
                                                    headerType={"lots"}
                                                    cardData={lot}
                                                    isFaverited={isFaverited(lot.id)}
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Container>
                        </Fade>
                    </Box>
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

export default Lots;
