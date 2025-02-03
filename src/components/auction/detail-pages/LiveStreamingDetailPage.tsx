import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, Avatar, CircularProgress, Container, Grid, IconButton, Button, Card, CardMedia, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getQueryParam } from '../../../helper/GetQueryParam';
import AuctionCard from '../auction-components/AuctionCard';
import PaginationButton from '../auction-components/PaginationButton';
import useLiveStreamDetailStyles from './detail-pages-components/LiveStreamingDetailStyles';
import { SuccessMessage, ErrorMessage } from '../../../utils/ToastMessages';
import { getAuctionDetailById } from '../../Services/Methods';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import theme from '../../../theme';
import CustomTextField from '../../custom-components/CustomTextField';

const LiveStreamingDetailPage = () => {
    const classes = useLiveStreamDetailStyles();

    const liveBidders = ["Bidder Name 1", "Bidder Name 2", "Bidder Name 3", "Bidder Name 4", "Bidder Name 5", "Bidder Name 6"];
    // const [liveStream, setLiveStream]: any = useState(liveStreamData.find((stream: any) => stream.id + "" === getQueryParam('aucId')))
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteAuctionId, setDeleteAuctionId] = useState(0)
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [auctionDetails, setAuctionDetails]: any = useState({})
    const [auctionLots, setAuctionLots]: any = useState([])
    const [paginationedData, setPaginationedData]: any = useState([])
    const [bidAmount, setBidAmount] = useState(0);


    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true);
            fetchAuctionDetails()
        }
    }, [])

    const fetchAuctionDetails = async () => {
        try {
            const response = await getAuctionDetailById(getQueryParam("aucId"));
            const auction = response.data.Auction;
            const lots = response.data.Lots;

            if (auction) {
                const formattedAuctionDetails = {
                    id: auction.Id,
                    name: auction.Name,
                    image: auction.Image,
                    type: auction.IsPast ? "past" : "current",
                    details: {
                        location: `${auction.City}, ${auction.Country}`,
                        dateRange: `${auction.StartDate} to ${auction.EndDate}`,
                        lotsAvailable: `${auction.TotalLots} Lots Available`
                    },

                    dateRange: `${auction.StartDate} to ${auction.EndDate}`,
                    timeRange: `${auction.StartTime} to ${auction.EndTime}`,
                    previewDateRange: `${auction.PrevStartDate} to ${auction.PrevEndDate}`,
                    previewTimeRange: `${auction.PrevStartTime} to ${auction.PrevEndTime}`,

                    description: auction.Description,
                    notes: auction.Notes,

                    liveStreaming: auction.LiveStreaming,
                    startDate: auction.StartDate,
                    endDate: auction.EndDate,
                    startTime: auction.StartTime,
                    endTime: auction.EndTime,
                    prevStartDate: auction.PrevStartDate,
                    prevEndDate: auction.PrevEndDate,
                    prevStartTime: auction.PrevStartTime,
                    prevEndTime: auction.PrevEndTime,

                    country: auction.Country,
                    state: auction.State,
                    zipCode: auction.ZipCode,
                    city: auction.City,
                    address: auction.Address,
                    fullAddress: `Street ${auction.Address}, ${auction.City}, ${auction.ZipCode}, ${auction.State}, ${auction.Country}`,
                    shippingMethod: auction.ShippingMethod,
                    termsConditions: auction.TermsConditions,
                    paymentTerms: auction.PaymentTerms,
                    // termsConxditions: "Welcome to our auction! By participating, you agree to our terms: All bids are binding and non-retractable. Items are sold without warranty, expressed or implied. Payment must be completed within 48 hours of auction close. Shipping costs are borne by the buyer, and delivery timelines may vary. We reserve the right to cancel or reschedule auctions without prior notice. Unauthorized use of our platform is prohibited. All sales are final; no returns or refunds will be entertained.",
                    // paymentTerms: "Welcome to our auction! By participating, you agree to our terms: All bids are binding and non-retractable. Items are sold without warranty, expressed or implied. Payment must be completed within 48 hours of auction close. Shipping costs are borne by the buyer, and delivery timelines may vary. We reserve the right to cancel or reschedule auctions without prior notice. Unauthorized use of our platform is prohibited. All sales are final; no returns or refunds will be entertained.",
                    createdAt: auction.CreatedAt,
                    updatedAt: auction.UpdateddAt,
                    isDeleted: auction.IsDeleted,
                    isSold: auction.IsSold,
                    totalLots: auction.TotalLots
                };
                setAuctionDetails(formattedAuctionDetails);
            } else {
                setAuctionDetails([]);
            }

            if (lots?.length > 0) {
                const formattedLots = lots.map((item: any) => ({
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
                setAuctionLots(formattedLots)
                setPaginationedData(formattedLots)
            } else {
                setAuctionLots([])
                setPaginationedData([])
            }

        } catch (error) {
        } finally {
            setIsFetchingData(false);
        }
    };


    // Handle value change in the TextField
    const handleChange = (event: any) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setBidAmount(value === "" ? 0 : parseInt(value, 10));
        }
    };

    // Increment the bid amount
    const handleIncrement = () => {
        setBidAmount((prev: any) => prev + 1);
    };

    // Decrement the bid amount
    const handleDecrement = () => {
        setBidAmount((prev: any) => (prev > 0 ? prev - 1 : 0)); // Ensure it doesn't go below 0
    };


    return (


        <Box py={2}>

            {!isFetchingData && auctionDetails && auctionLots.length > 0 ?
                <Box>
                    {/* Page Title */}
                    <Typography
                        sx={{ marginTop: "20px", marginBottom: "40px", fontWeight: 600, fontSize: '40px' }}
                    >
                        Live Video Streaming:
                    </Typography>

                    {/* Streaming Card */}
                    <Card
                        sx={{
                            padding: "30px 30px 80px 30px",
                            borderRadius: "12px",
                            boxShadow: 3,
                            position: "relative",
                            marginBottom: '60px'
                        }}
                    >
                        {/* Image Section */}
                        <Box sx={{ position: "relative", marginBottom: "35px" }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image="/assets/pngs/live-detail.png" // Replace with the image URL
                                alt="Live Auction"
                                sx={{ borderRadius: "12px", width: '100%', height: '640px' }}
                            />
                            {/* Overlay Badges */}
                            <Button
                                variant="contained"
                                color="error"
                                className={classes.liveBtn}
                            >
                                Live Stream
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.nameBtn}>
                                John Anderson Smith
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.rateBtn}
                            >
                                Highest Bid: $10,000
                            </Button>
                        </Box >

                        {/* Auction Title */}
                        < Typography
                            fontSize={'35px'}
                            sx={{ fontWeight: 600, marginBottom: "18px", maxWidth: '752px', color: '#2D3748' }}
                        >
                            {auctionDetails.name}
                        </Typography >

                        {/* Auction Description */}
                        < Typography
                            sx={{ color: "#838383", marginBottom: "18px", fontSize: '18px', lineHeight: "1.6", maxWidth: '937px' }}
                        >
                            {auctionDetails.description}
                        </Typography >

                        {/* Bid Input */}
                        < Typography sx={{ fontWeight: 600, fontSize: '22px', marginBottom: "15px" }}>
                            Place Bid
                        </Typography >
                        <Stack mb={'30px'} direction="row" alignItems="center" spacing={2}>
                            <Box className={classes.bidAmount}>
                                <TextField
                                    placeholder="Enter Bid Amount"
                                    variant="outlined"
                                    value={bidAmount}
                                    onChange={handleChange}
                                />
                            </Box>

                            <IconButton
                                className={classes.iconBtn} onClick={handleIncrement}>
                                <AddIcon />
                            </IconButton>

                            <IconButton
                                className={classes.iconBtn} onClick={handleDecrement}>
                                <RemoveIcon />
                            </IconButton>
                        </Stack>

                        <Button
                            variant="contained"
                            className={classes.submitBtn}
                        >
                            Submit
                        </Button>

                    </Card >

                    {/* Page Title */}


                    {auctionLots.length > 0 &&
                        <Box overflow={'auto'} pt={3}>
                            <Box className={classes.titleWrapper}>
                                < Typography
                                    sx={{ marginTop: "20px", marginBottom: "40px", fontWeight: 600, fontSize: '40px' }}
                                >
                                    Upcoming Lots:
                                </Typography>

                            </Box>

                            <Container disableGutters maxWidth={false} sx={{ mt: 3, pl: 1 }}>
                                <Grid container spacing={3}>
                                    {
                                        paginationedData
                                            .map((lot: any) => (
                                                <Grid item xs={12} sm={6} md={4} xl={3} key={lot.id}>
                                                    <AuctionCard
                                                        headerType={'lots'}
                                                        cardData={lot}
                                                        setPaginationedData={setPaginationedData}
                                                    />
                                                </Grid>
                                            ))
                                    }


                                </Grid>
                            </Container>
                            <PaginationButton filteredData={auctionLots} setPaginationedData={setPaginationedData} />
                        </Box>
                    }



                </Box>
                :
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
            }
        </Box >
    );
};

export default LiveStreamingDetailPage;
