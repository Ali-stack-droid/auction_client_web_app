import { Card, CardMedia, Typography, Button, Tooltip, Box, TextField, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuctionCardStyles } from './AuctionStyles';
import AuctionDetails from './card-details-components/AuctionDetails';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MoveLotModal from '../detail-pages/detail-pages-components/MoveLotModal';
import HomeDetails from './card-details-components/HomeDetails';
import LotDetails from './card-details-components/LotDetails';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CurrentAuctionDetails from './card-details-components/CurrentAuctionDetails';
import Cookies from 'js-cookie';
import { ErrorMessage, SuccessMessage } from '../../../utils/ToastMessages';
import { addToWatchlist } from '../../Services/Methods';


const AuctionCard = ({
    headerType,
    cardData,
    handleEdit,
    handleDelete,
    handleMoveModal
}: any) => {
    const classes = useAuctionCardStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const [select, setSelect] = useState(false)
    const [moveLotId, setMoveLotId] = useState(0)

    const [moveModalOpen, setMoveModalOpen] = useState(false)
    // const [moveDialogue, setMoveDialogue] = useState(false)

    const dispatch = useDispatch();

    const handleCardMediaClick = () => {
        if (headerType === "live") {
            navigate(`/live/details?aucId=${cardData.id}`);
        } else if (headerType === "lots") {
            navigate(`/listings/details?lotId=${cardData.id}`);
        } else {
            navigate(`/current-auctions/details?aucId=${cardData.id}`);
        }
    };

    const handleAddWatchList = async (id: any) => {
        const user: any = sessionStorage.getItem('authToken') || Cookies.get('user');
        const clientId = (sessionStorage.getItem('authToken') ?
            JSON.parse(user).id : Cookies.get('user')
                ? JSON.parse(user).id : '')
        try {
            const response = await addToWatchlist(clientId, id)
            if (response.data) {
                SuccessMessage('Added to watchlist!')
            }
        } catch {
            ErrorMessage('Error adding to watchlist!')
        }
    }

    const handleBidNow = () => {
        const user: any = sessionStorage.getItem('authToken') || Cookies.get('user');
        if (user) {
            SuccessMessage('Bid placed successfully!')
        } else {
            navigate('/login')
        }
    }

    return (
        <Card className={classes.card} elevation={2}>
            {/* Auction Image */}
            <Box sx={{
                position: 'relative', // Ensure the button is positioned relative to the Box
            }}>
                <CardMedia
                    onClick={handleCardMediaClick}
                    component="img"
                    height={"267"}
                    image={cardData.image}
                    alt={headerType === "Auction" ? "Auction" : "Lot" + " Image"}
                    className={classes.media}
                />
                {headerType === "lots"
                    && (sessionStorage.getItem('authToken') || Cookies.get('user'))
                    && (
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: '#012868',
                                color: '#ffffff',
                                '&:hover': { backgroundColor: '#001c48' },
                                boxShadow: 2,
                            }}
                            onClick={() => handleAddWatchList(cardData.id)} // Add your action here
                        >
                            <FavoriteBorderIcon />
                        </IconButton>
                    )}
                {
                    ((headerType === "lots" && cardData.isPast) || headerType === "live" || headerType === "inventory") &&

                    <Button
                        variant="contained"
                        size="small"
                        className={headerType === "live" ? classes.unSoldButtonLive : `${classes.soldButton} ${!cardData.sold ? classes.unSoldButton : ''}`}
                    >
                        {headerType === "live" && cardData?.isLive ? "Live Streaming Auction" : cardData.sold ? "Sold" : "Unsold"}
                    </Button>
                }

            </Box>
            <Box className={classes.contentWrapper}>
                {/* Auction Details */}
                <Box className={classes.content}>
                    {/* Title */}
                    <Tooltip title={cardData.name}>
                        <Typography className={classes.title} gutterBottom>
                            {cardData.name?.length > 43 ? `${cardData.name.substring(0, 33)}...` : cardData.name}
                        </Typography>
                    </Tooltip>


                </Box>

                {/* Location, Date, and Lots */}
                {headerType === "auction" ? (
                    <AuctionDetails auctionDetails={cardData.details} />
                ) : headerType === "lots" ? (
                    <LotDetails lotData={cardData} />
                ) : headerType === "current-auction" || headerType === "live" ? (
                    <CurrentAuctionDetails auctionDetails={cardData} />
                ) :
                    <HomeDetails homeData={cardData} />
                }

                {/* Action Buttons */}
                <Box className={classes.actionButtons}>
                    {headerType === "auction" || headerType === "home" ?
                        <Button className={classes.viewButton} variant={"contained"} >
                            View Auction
                        </Button>
                        : headerType === "lots" ?
                            <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                                <Button className={classes.bidButton} variant="contained" color="primary" onClick={() => handleBidNow()}>
                                    Bid Now $1600
                                </Button>
                                <Typography m={'10px 0'} sx={{ fontSize: '12px', color: '#212121', fontWeight: 500 }}>
                                    You can enter your custom Amount
                                </Typography>
                                <Box mb={'4px'}>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            width: '175px',
                                            height: '31px',
                                            '& .MuiInputBase-input::placeholder': {
                                                fontSize: '13px',
                                            },
                                        }}
                                        placeholder="Enter Bid Amount"
                                    />
                                </Box>


                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitBtn}
                                >
                                    Submit
                                </Button>

                            </Box>
                            : headerType === "live" ?
                                <Button className={classes.bidButton} variant="contained" color="primary">
                                    Join Auction
                                </Button>
                                : <Button className={classes.bidButton} variant="contained" color="primary">
                                    View Auction
                                </Button>
                    }
                </Box>
            </Box>

            {/* Move Lot Confirmation on Move Button*/}
            {/* <CustomDialogue
                type={"create"}
                title={"Move Lot Confirmation!"}
                message={"Are you sure you want to move this lot from past auction to current auction?"}
                openDialogue={moveDialogue}
                handleCloseModal={() => setMoveDialogue(false)}
                handleConfirmModal={() => { setMoveDialogue(false); setMoveModalOpen(true) }}
            /> */}

            <MoveLotModal open={moveModalOpen} handleMoveModal={handleMoveModal} setMoveModalOpen={setMoveModalOpen} moveLotId={moveLotId} />

        </Card >
    );
};

export default AuctionCard;
