import React, { useCallback, useEffect, useState } from 'react';
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

const LiveStreamingDetailPage = ({ socket }: any) => {
    const classes = useLiveStreamDetailStyles();

    const [isFetchingData, setIsFetchingData] = useState(false);
    // const [auctionDetails, setAuctionDetails]: any = useState({})
    const [auctionLots, setAuctionLots]: any = useState([])
    const [paginationedData, setPaginationedData]: any = useState([])
    const [bidAmount, setBidAmount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true);
            fetchAuctionDetails()
        }
    }, [])

    useEffect(() => {
        const lotId = parseInt(getQueryParam("lotId") + "", 10);
        if (lotId) {
            handleNextLot(lotId);
        }
    }, [auctionLots])


    useEffect(() => {
        socket.on("emit-testing-event", (message:any)=>{
            console.log("emit-testing-event",message);
        })
        // setUser("ali cheema")
        // joinRoom("4bebcbfb-15d9-4fbc-b41e-ee0c9add7131")
    }, [socket]);

    const handleListenMessage = (message: any) => {
        console.log("Message received: ", message);
    }


    const setUser = useCallback((userName: string) => {
        if (socket) { // Check if WebSocket is connected
            const data = {
                event: "setUserName",
                userName,
            };
            socket.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, []);


    const joinRoom = useCallback((roomName: string) => {
        if (socket) { // Check if WebSocket is connected
            const data = {
                event: "joinRoom",
                roomName,
            };
            socket.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [socket]);


    const handleSocketEmit = () => {
        console.log("handleSocketEmit");
        socket.emit("testing-event2", "Hello from server event 2!");

    }


    const leaveRoom = useCallback((roomName: string) => {
        if (socket) { // Check if WebSocket is connected
            const data = {
                event: "leaveRoom",
                roomName,
            };
            socket.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [socket]);


    useEffect(() => {

        let payload = {
            message: "Hello from the client!"
        }
        console.log(payload);
        socket.onopen = () => {
            console.log("Connected to WebSocket server.");
            socket.send(JSON.stringify({ event: "testing-event", data: payload }));
        };
        // socket.onMessage("testing-event", (message:any) => {
        //     console.log("Testing event received!",message);
        //   });
        //         socket.onmessage = (event: any) => {
        // const dataString = event.data 
        //             console.log("data", event.data);
        //             // Extract the relevant parts of the string using regex
        // const lotIdMatch = dataString.match(/LotID: (\d+)/);
        // const clientIdMatch = dataString.match(/ClientID: (\d+)/);
        // const amountMatch = dataString.match(/Amount: (\d+)/);

        // // Create the object
        // const dataObject = {
        //     lotId: lotIdMatch ? parseInt(lotIdMatch[1]) : null,
        //     ClientId: clientIdMatch ? parseInt(clientIdMatch[1]) : null,
        //     Amount: amountMatch ? parseInt(amountMatch[1]) : null,
        //     ClientName: "alicheema" // Assuming the client name is always "alicheema"
        // };

        // console.log("dataObject",dataObject);
        //         };
    }, [socket]);


    const sendMessage = useCallback((roomName: string, message: string, lotID?: number, clientId?: number, amount?: number) => {
        if (socket) { // Check if WebSocket is connected
            const data = {
                event: "sendMessageToRoom",
                roomName,
                message,
                lotID,
                clientId,
                amount,
            };
            socket.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not connected.");
        }
    }, [socket]);

    const fetchAuctionDetails = async () => {
        try {
            const response = await getAuctionDetailById(getQueryParam("aucId"));
            const lots = response.data.Lots;
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

    const handleNextLot = (id?: number) => {
        setCurrentIndex((prevIndex) => {
            const newIndex = auctionLots.findIndex((lot: any) => lot.id === id);
            return newIndex !== -1 ? newIndex : prevIndex; // Set index if found, otherwise keep previous index
        });
    };

    return (
        <Box py={2}>
            {!isFetchingData && auctionLots.length > 0 ?
                <Box>
                    <Typography sx={{ marginTop: "20px", marginBottom: "40px", fontWeight: 600, fontSize: '40px' }}  >
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
                                image={auctionLots[currentIndex].image} // Replace with the image URL
                                alt="Live Auction"
                                sx={{ borderRadius: "12px", width: '100%', height: '640px' }}
                            />
                            {/* Overlay Badges */}
                            <Button
                                variant="contained"
                                color="error"
                                className={classes.liveBtn}
                                onClick={handleSocketEmit}
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
                            {auctionLots[currentIndex].name}
                        </Typography >

                        {/* Auction Description */}
                        < Typography
                            sx={{ color: "#838383", marginBottom: "18px", fontSize: '18px', lineHeight: "1.6", maxWidth: '937px' }}
                        >
                            {auctionLots[currentIndex].description}
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
                            onClick={() => sendMessage("4bebcbfb-15d9-4fbc-b41e-ee0c9add7131", "this is the new lot", 94, 38, 400)}
                        >
                            Submit
                        </Button>

                    </Card >

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
                                                        isLiveLot={true}
                                                        handleNextLot={handleNextLot}
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
