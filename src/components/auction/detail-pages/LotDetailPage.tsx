import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    CardMedia,
    Grid,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    TextField,
} from "@mui/material";
import useDetailStyles from "./detail-pages-components/DetailPageStyles";
import { getQueryParam } from "../../../helper/GetQueryParam";

import { useLocation, useNavigate } from "react-router-dom";
import { getLotDetailsById } from "../../Services/Methods";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import theme from "../../../theme";

const LotDetailPage = () => {
    const classes = useDetailStyles();

    const [lotDetails, setLotDetails]: any = useState({})
    const [isFetchingData, setIsFetchingData] = useState(false)

    const [mainImage, setMainImage] = useState("");
    const [countdown, setCountdown] = useState<string>('2 days : 22 hours : 12 minutes : 54 seconds');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime();

            if (lotDetails) {
                // Combine date and time into a single string and parse it
                const date = lotDetails.startDate; // Example: "22-05-1992"
                const time = lotDetails.startTime; // Example: "3:32 PM"
                const [day, month, year] = date.split('-'); // Split date into parts

                // Parse into a Date object
                const endDate = new Date(`${month}-${day}-${year} ${time}`).getTime();

                if (isNaN(endDate)) {
                    console.error("Invalid date or time format");
                    setCountdown("");
                    return;
                }

                const timeDifference = endDate - now;

                if (timeDifference <= 0) {
                    setCountdown("");
                    clearInterval(intervalId);
                    return;
                }

                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setCountdown(`${days} days : ${hours} hours : ${minutes} minutes : ${seconds} seconds`);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [lotDetails]);

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true);
            fetchLotDetails();
        }
    }, [])

    const fetchLotDetails = async () => {
        try {
            const response = await getLotDetailsById(getQueryParam('lotId'));
            const lot = response.data?.Lot;
            const images = [
                ...(lot.Image ? [lot.Image] : []),
                ...(response.data?.Images || []).map((img: any) => img.Image)
            ];
            const bidsRange = response.data?.BidsRange || [];

            if (lot) {
                const formattedLotDetails = {
                    id: lot.Id,
                    auctionId: lot.AuctionId,
                    lotNumber: lot.LotNo,
                    name: lot.ShortDescription,
                    description: lot.LongDescription,
                    countDown: "N/A", // Update if you calculate countdown elsewhere
                    location: "N/A", // Replace with actual location if available
                    image: lot.Image,
                    type: lot.IsPast ? "past" : "current",
                    highestBid: lot.BidStartAmount,
                    sold: lot.IsSold,
                    buyerPremium: lot.BuyerPremium,
                    currency: lot.Currency,
                    images: images,
                    startDate: lot.StartDate,
                    endDate: lot.EndDate,
                    startTime: lot.StartTime,
                    endTime: lot.endTime,
                    details: {
                        description: lot.LongDescription,
                        date: `${lot.StartDate} to ${lot.EndDate}`,
                        time: `${lot.StartTime} to ${lot.EndTime}`,
                        orderNumber: lot.OrderNo,
                        lot: lot.LotNo,
                        category: lot.Category,
                        subCategory: lot.SubCategory,
                        auctionId: lot.AuctionId,
                        createdAt: lot.CreatedAt,
                        updatedAt: lot.UpdateddAt,
                    },
                    bidsRange: bidsRange.map((bid: any) => ({
                        id: bid.Id,
                        startAmount: bid.StartAmount,
                        endAmount: bid.EndAmount,
                        bidRangeAmount: bid.BidRange,
                    })),
                };
                setMainImage(formattedLotDetails.image || `${process.env.PUBLIC_URL}/assets/pngs/placeholder.png`)
                setLotDetails(formattedLotDetails);
            } else {
                setLotDetails([]);
            }
        } catch (error) {
            console.error('Error fetching auction data:', error);
            setIsFetchingData(false);
        } finally {
            setIsFetchingData(false);
        }
    };

    return (

        <Box pt={'10px'} pb={'180px'}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography className={classes.title}>
                    Listing Details:
                </Typography>
            </Box>

            <Grid width={'100%'} ml={0} mt={'10px'} container spacing={4} justifyContent={'space-between'}>
                {/* Left Section */}
                <Grid item xs={12} md={6} className={classes.cardGrid}>
                    {/* Main Image */}
                    <CardMedia
                        component="img"
                        image="/assets/pngs/list-detail.png" // Replace with your image URL
                        alt="Main Product"
                        sx={{
                            width: "100%",
                            height: "363px",
                            borderRadius: "20px",
                            mb: 2,
                        }}
                    />
                    {/* Thumbnail Images */}
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item xs={3} key={item}>
                                <CardMedia
                                    component="img"
                                    image="/assets/pngs/list-detail1.png" // Replace with thumbnail URL
                                    alt="Thumbnail"
                                    sx={{
                                        width: "100%",
                                        height: "100px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Right Section */}
                <Grid sx={{ padding: '0 !important' }} item xs={12} md={5}>
                    {/* Product Details */}
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '22px' }}>
                        {lotDetails.name}
                    </Typography>

                    <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#212121" }}>
                        ID: #{lotDetails.id}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography mb={'10px'} sx={{ fontSize: "18px", fontWeight: 600, color: "#2D3748" }}>
                        Date and Time
                    </Typography>

                    {/* Date and Time */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                        <Box sx={{ display: "flex", alignItems: "center", flex: 0.7 }} >
                            <CalendarTodayIcon sx={{ fontSize: 15, color: "#012868", mr: 1 }} />
                            <Typography sx={{ fontSize: "14px", color: "#2D3748", fontWeight: 500, marginRight: '20px' }}>
                                {lotDetails.details?.date.replaceAll('-', '/')}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", flex: 0.7 }}>
                            <AccessTimeFilledIcon sx={{ fontSize: 15, color: "#012868", mr: 1 }} />
                            {countdown !== "" ?
                                <Typography sx={{ fontSize: "14px", color: "#757575", fontWeight: 500 }}>
                                    {countdown}
                                </Typography>
                                :
                                <Typography color={theme.palette.secondary.main} whiteSpace={'nowrap'}>
                                    Lot Ended
                                </Typography>
                            }
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Current Bid */}
                    <Typography
                        sx={{ fontSize: "25px", fontWeight: 600, color: '#012868', mt: 3, mb: '10px' }}
                    >
                        Current Bid: <span style={{ color: "#212121" }}>${lotDetails.highestBid}</span>
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Bid Now Button */}
                    <Button
                        variant="outlined"
                        sx={{
                            width: "326px",
                            height: "64px",
                            borderColor: "#012868",
                            color: "#212121",
                            fontWeight: 600,
                            fontSize: '16px',
                            borderRadius: '14px',
                            textTransform: 'none'
                        }}
                    >
                        Bid Now: ${lotDetails.highestBid}
                    </Button>

                    <Divider sx={{ my: 2 }} />

                    {/* Bid Price Section */}
                    <Typography sx={{ fontWeight: 600, mt: '30px', fontSize: '18px' }}>Bid Price</Typography>
                    <Box className={classes.bidAmount} sx={{ display: "flex", alignItems: "center", mt: '10px' }}>
                        <TextField
                            placeholder="Enter Your Bid Amount"
                            variant="outlined"
                            sx={{ flex: 1, mr: '10px' }}
                        />

                        <Button
                            className={classes.submitBtn}
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Additional Details */}
            <Grid mt={'20px'} container spacing={2}>
                <Grid className={classes.lotDetail} item xs={12}>
                    <Typography sx={{ fontSize: "12px", color: "#012868", fontWeight: 600 }}>

                        Order Number:
                        <span style={{ color: "#212121" }}>#{lotDetails.details?.orderNumber}</span>
                        &nbsp;&nbsp;

                        Lot: <span style={{ color: "#212121" }}>{lotDetails.id}</span>
                        &nbsp;&nbsp;

                        Category:
                        <span style={{ color: "#212121" }}> &nbsp;{lotDetails.details?.category}</span>
                        &nbsp;&nbsp;

                        Sub-Category:
                        <span style={{ color: "#212121" }}> &nbsp;{lotDetails.details?.subCategory}</span>
                    </Typography>
                </Grid>
            </Grid>

            {/* Accordion Section */}
            <Grid width={'100%'} ml={0} mt={'20px'} container spacing={4} justifyContent={'space-between'}>

                <Grid item xs={12} md={6} sx={{ mt: 4 }} className={classes.accordianGrid}>
                    {[
                        { title: "Terms and Conditions", content: lotDetails?.termCondition || "No terms found for this lot!" },
                        { title: "Payment Information", content: lotDetails?.paymentTerms || "No terms found for this lot!" },
                        {
                            title: "Pickup and Shipping Details", content:
                                `We offer shipping for this lot. Please contact us for a quote. We use UPS, USPS, and FedEx for all shipping. We can also accommodate local pickup.`
                        },
                    ].map((item, index) => (
                        <Accordion
                            sx={{
                                marginBottom: index !== 2 ? '6px' : 0, // Adds 6px margin except for the last item
                                borderRadius: "8px", // Optional, for better UI
                                boxShadow: 'none',
                                border: '1px solid #E2E8F0'
                            }}
                            key={index}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.accordianSummary}
                            >
                                {item.title}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{item.content}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
            </Grid>
        </Box >
    );
};

export default LotDetailPage;
