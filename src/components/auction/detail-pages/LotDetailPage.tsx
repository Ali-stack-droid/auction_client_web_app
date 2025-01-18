import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Card,
    CardMedia,
    Grid,
    Avatar,
    Tooltip,
    CircularProgress,
    IconButton,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    TextField,
} from "@mui/material";
import useDetailStyles from "./detail-pages-components/DetailPageStyles";
import { getQueryParam } from "../../../helper/GetQueryParam";
import theme from "../../../theme";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { useLocation, useNavigate } from "react-router-dom";
import CustomDialogue from "../../custom-components/CustomDialogue";
import WinnerModal from "./detail-pages-components/WinnerModal";
import { deleteLot, getBiddersByLotId, getLotDetails, getLotDetailsById, getWinnerByLotId } from "../../Services/Methods";
import { ErrorMessage, SuccessMessage } from "../../../utils/ToastMessages";
import BiddingTable from "./detail-pages-components/BiddingTable";
import BiddersModal from "./detail-pages-components/BiddersModal";
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const LotDetailPage = () => {
    const classes = useDetailStyles();
    const navigate = useNavigate();
    const locationURL = useLocation();

    const [lotDetails, setLotDetails]: any = useState({})
    const [bidders, setBidders]: any = useState([])
    const [winner, setWinner]: any = useState({});

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteLotId, setDeleteLotId] = useState(0)

    const [winnerModal, setWinnerModal] = useState(false)
    const [openBidders, setOpenBidders] = useState(false)
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false);

    const [mainImage, setMainImage] = useState("");

    const fakeBidders = [
        {
            id: "raw-1",
            clientId: "client-1",
            name: "John Doe",
            bidAmount: 100,
            email: "john.doe@example.com",
            address: "123 Main St, Springfield",
            company: "ABC Corp",
        },
        {
            id: "raw-2",
            clientId: "client-2",
            name: "Jane Smith",
            bidAmount: 200,
            email: "jane.smith@example.com",
            address: "456 Elm St, Metropolis",
            company: "XYZ Ltd",
        },
        {
            id: "raw-3",
            clientId: "client-3",
            name: "Robert Brown",
            bidAmount: 300,
            email: "robert.brown@example.com",
            address: "789 Oak St, Gotham",
            company: "PQR Inc",
        },
        {
            id: "raw-4",
            clientId: "client-4",
            name: "Emily White",
            bidAmount: 400,
            email: "emily.white@example.com",
            address: "321 Pine St, Star City",
            company: "LMN LLC",
        },
        {
            id: "raw-5",
            clientId: "client-5",
            name: "Michael Green",
            bidAmount: 500,
            email: "michael.green@example.com",
            address: "654 Maple St, Central City",
            company: "DEF Group",
        },
    ];


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
                fetchBidders();
                fetchWinner();
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

    const fetchBidders = async () => {
        try {
            const response = await getBiddersByLotId(getQueryParam('lotId'));
            const bidders = response.data;
            if (bidders.length > 0) {
                const formattedBidders = response.data.map((bidder: any) => ({
                    id: bidder.Id,
                    clientId: bidder.ClientId,
                    name: bidder.Name,
                    bidAmount: bidder.BidAmount,
                    email: bidder.Email,
                    address: bidder.Address,
                    company: bidder.Company,
                }));
                setBidders(formattedBidders)
            } else {
                setBidders(fakeBidders)
                // setBidders([]);
            }
        } catch (error) {
            console.error('Error fetching auction data:', error);
        }
    };

    const fetchWinner = async () => {
        try {
            const response = await getWinnerByLotId(getQueryParam('lotId'));
            const winnerDetails = response.data;
            const formattedWinner = {
                name: winnerDetails.Clients?.Name || "N/A",
                email: winnerDetails.Clients?.Email || "N/A",
                phone: winnerDetails.Clients?.Phone || "N/A", // Replace with actual phone if available
                location: winnerDetails.Clients?.Address || "N/A",
                image: winnerDetails.Lots?.Image || `${process.env.PUBLIC_URL}/assets/pngs/winner.png`,
            };

            if (winner.name) {

                setWinner(formattedWinner);
            } else {
                setWinner({
                    name: "Ali Cheema",
                    email: "alicheema@gmail.com",
                    phone: "+9231675485", // Replace with actual phone if available
                    location: "Street 4, Lost Angeles, California",
                    image: `${process.env.PUBLIC_URL}/assets/pngs/winner.png`,
                });

            }
        } catch (err) {
            setWinner({
                name: "Ali Cheema",
                email: "alicheema@gmail.com",
                phone: "+9231675485", // Replace with actual phone if available
                location: "Street 4, Lost Angeles, California",
                image: `${process.env.PUBLIC_URL}/assets/pngs/winner.png`,
            });
            // setWinner({});
            // console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            const response: any = await deleteLot(deleteLotId);
            if (response.status === 200) {
                SuccessMessage('Lot deleted successfully!')
                navigate(`/auction/lots?aucId=${response.data.AuctionID}`)
            } else {
                ErrorMessage('Error deleting lot!')
            }
        } catch (error) {
            console.error('Error deleting auction:', error);
        } finally {
            handleCloseModal()
        }
    };

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`/auction/lots/edit?lotId=${id}`); // Navigate to the edit route with auction ID
    };

    // Open confirmation modal
    const handleDeleteLot = (id: number) => {
        setDeleteLotId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        if (!isDeleting) {
            setIsDeleting(false)
            setConfirmDelete(false);
            setDeleteLotId(0);
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (!isDeleting) {
            setIsDeleting(true)
            handleDelete(); // Call the delete handler
        }
    };

    const handleWinnerDetails = () => {
        setWinnerModal(true)
    }

    const handleThumbnailClick = (selectedImage: string) => {
        setMainImage(selectedImage);
    };

    const handleBackClick = () => {
        const isFromInventory = localStorage.getItem('inventory');
        if (isFromInventory) {
            localStorage.removeItem('inventory');
            navigate(`/inventory`)
        } else {
            navigate(`/auction/lots?aucId=${lotDetails.auctionId}`)
        }
    }

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
                        The Name of the Product Goes Here....
                    </Typography>

                    <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#212121" }}>
                        ID: #365
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography mb={'10px'} sx={{ fontSize: "18px", fontWeight: 600, color: "#2D3748" }}>
                        Date and Time
                    </Typography>

                    {/* Date and Time */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                        <CalendarTodayIcon sx={{ fontSize: 15, color: "#012868", mr: 1 }} />
                        <Typography sx={{ fontSize: "14px", color: "#2D3748", fontWeight: 500, marginRight: '20px' }}>
                            23-04-2024 to 30-04-2024
                        </Typography>

                        <AccessTimeFilledIcon sx={{ fontSize: 15, color: "#012868", mr: 1 }} />
                        <Typography
                            sx={{ fontSize: "14px", color: "#757575", fontWeight: 500 }}
                        >
                            2 days : 22 hours : 12 minutes : 54 seconds
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Current Bid */}
                    <Typography
                        sx={{ fontSize: "25px", fontWeight: 600, color: '#012868', mt: 3, mb: '10px' }}
                    >
                        Current Bid: <span style={{ color: "#212121" }}>$25000.90</span>
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
                        Bid Now: $1600
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
                        Order Number: <span style={{ color: "#212121" }}>#345</span>  &nbsp;&nbsp; Lot: <span style={{ color: "#212121" }}>45</span>  &nbsp;&nbsp; Category:
                        <span style={{ color: "#212121" }}>ABCXYZ</span> &nbsp;&nbsp; Sub-Category: <span style={{ color: "#212121" }}>ABCXYZ</span>
                    </Typography>
                </Grid>
            </Grid>

            {/* Accordion Section */}
            <Grid width={'100%'} ml={0} mt={'20px'} container spacing={4} justifyContent={'space-between'}>

                <Grid item xs={12} md={6} sx={{ mt: 4 }} className={classes.accordianGrid}>
                    {[
                        { title: "Terms and Conditions", content: "Terms and conditions content goes here." },
                        { title: "Payment Information", content: "Payment information content goes here." },
                        { title: "Pickup and Shipping Details", content: "Pickup and shipping details content goes here." },
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














        // <Box p={2}>
        //     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2 }}>
        //         <IconButton onClick={handleBackClick}>
        //             <KeyboardReturnRoundedIcon />
        //         </IconButton>
        //         <Typography className={classes.title}>
        //             Lot Details
        //         </Typography>
        //     </Box>

        //     {!isFetchingData ?
        //         <Grid container spacing={4}>
        //             {/* Left Section */}
        //             <Grid item xs={12} md={6}>
        //                 <Card className={classes.card} elevation={2}>
        //                     {/* Main Image */}
        //                     <CardMedia
        //                         component="img"
        //                         image={mainImage}
        //                         alt="Lot Image"
        //                         className={classes.media}
        //                         height={300}
        //                     />
        //                     <Button
        //                         variant="contained"
        //                         size="small"
        //                         className={`${classes.soldButton} ${!lotDetails.sold ? classes.unSoldButton : ''}`}
        //                     >
        //                         {lotDetails.sold ? "Sold" : "Unsold"}
        //                     </Button>

        //                     {/* Thumbnails */}
        //                     {lotDetails.images?.length > 1 &&
        //                         <Box className={classes.thmbnailsWrapper}>
        //                             {lotDetails.images?.map((img: any, index: number) => (
        //                                 <CardMedia
        //                                     key={index}
        //                                     component="img"
        //                                     image={img || `${process.env.PUBLIC_URL}/assets/pngs/placeholder.png`}
        //                                     alt="Thumbnail"
        //                                     className={classes.thumbnails}
        //                                     onClick={() => handleThumbnailClick(img)}
        //                                 />
        //                             ))}
        //                         </Box>
        //                     }
        //                 </Card>

        //                 {/* Winner and View Bidders */}
        //                 <Box className={classes.buttonContainer}>
        //                     <Button
        //                         variant="contained"
        //                         className={classes.winnerButton}
        //                         onClick={handleWinnerDetails}
        //                     >
        //                         Winner Detail
        //                     </Button>
        //                     <Button
        //                         variant="outlined"
        //                         className={classes.viewButton}
        //                         onClick={() => setOpenBidders(true)}
        //                     >
        //                         View Bidders
        //                     </Button>
        //                 </Box>

        //                 {lotDetails.bidsRange?.length > 0 &&
        //                     <Box paddingTop={5}>
        //                         <BiddingTable biddingData={lotDetails.bidsRange} />
        //                     </Box>
        //                 }

        //             </Grid>

        //             {/* Right Section */}
        //             <Grid item xs={12} md={6}>
        //                 <Box>
        //                     <Typography className={classes.rightTitle}>
        //                         {lotDetails.name}
        //                     </Typography>
        //                     <Typography gutterBottom className={classes.rightTitle}>
        //                         {lotDetails.location}
        //                     </Typography>
        //                     <Typography className={classes.description} mb={2}>
        //                         {lotDetails.details?.description}
        //                     </Typography>

        //                     {/* Details */}
        //                     <Typography className={classes.dateTime} color={theme.palette.primary.main2} gutterBottom>
        //                         Date and Time
        //                     </Typography>

        //                     <Box className={classes.row}>
        //                         <Box className={classes.iconText}>
        //                             <CalendarMonthIcon fontSize="small" color="primary" />
        //                             <Typography className={classes.text}>{lotDetails.details?.date}</Typography>
        //                         </Box>
        //                         <Box className={classes.iconText}>
        //                             <WatchLaterRoundedIcon fontSize="small" color="primary" />
        //                             <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
        //                                 {lotDetails.details?.time}
        //                             </Typography>
        //                         </Box>
        //                     </Box>

        //                     <Box className={classes.detailRow}>
        //                         <Box className={classes.details}>
        //                             <Typography className={classes.detailHeading}>Order Number</Typography>
        //                             <Typography className={classes.detailText} >&nbsp;: #{lotDetails.details?.orderNumber}</Typography>
        //                         </Box>
        //                         <Box className={classes.details}>
        //                             <Typography className={classes.detailHeading}>Lot</Typography>
        //                             <Typography className={classes.detailText}  >&nbsp;:&nbsp;{lotDetails.details?.lot}</Typography>
        //                         </Box>
        //                         <Box className={classes.details}>
        //                             <Typography className={classes.detailHeading}>Category</Typography>
        //                             <Typography className={classes.detailText} >&nbsp;:&nbsp;{lotDetails.details?.category}</Typography>
        //                         </Box>
        //                         <Box className={classes.details}>
        //                             <Typography className={classes.detailHeading}>Sub-Category</Typography>
        //                             <Typography className={classes.detailText}  >&nbsp;:&nbsp;{lotDetails.details?.subCategory}</Typography>
        //                         </Box>
        //                     </Box>

        //                     {/* Buttons */}
        //                     <Box className={classes.actionButtons}>
        //                         <Button className={classes.actionButton}
        //                             variant="contained" size="small" color="primary"
        //                             onClick={() => handleEdit(lotDetails.id)}
        //                         >
        //                             Edit
        //                         </Button>
        //                         <Button className={classes.actionButton}
        //                             variant="contained" size="small" color="error"
        //                             onClick={() => handleDeleteLot(lotDetails.id)}
        //                         >
        //                             Delete
        //                         </Button>
        //                     </Box>
        //                 </Box>
        //             </Grid>
        //         </Grid>
        //         :
        //         <Box
        //             sx={{
        //                 display: 'flex',
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 height: '70vh',
        //                 width: '100%',
        //             }}
        //         >
        //             <CircularProgress size={70} disableShrink />
        //         </Box>
        //     }
        //     {/* Confirmation Modal */}
        //     <CustomDialogue
        //         type={"delete"}
        //         title={"Confirm Deletion"}
        //         message={"Are you sure you want to delete this auction? This action cannot be undone."}
        //         openDialogue={confirmDelete}
        //         handleCloseModal={handleCloseModal}
        //         handleConfirmModal={handleConfirmDelete}
        //         isDeleting={isDeleting}

        //     />

        //     <WinnerModal open={winnerModal} onClose={() => setWinnerModal(false)} winner={winner} />

        //     <BiddersModal open={openBidders} onClose={() => setOpenBidders(false)} bidders={bidders} />
        // </Box >
    );
};

export default LotDetailPage;
