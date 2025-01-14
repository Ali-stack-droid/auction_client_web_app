import { Card, CardMedia, Typography, Button, Tooltip, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuctionCardStyles } from './AuctionStyles';
import LotDetails from './card-details-components/HomeDetails';
import AuctionDetails from './card-details-components/AuctionDetails';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MoveLotModal from '../detail-pages/detail-pages-components/MoveLotModal';
import HomeDetails from './card-details-components/HomeDetails';

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
            navigate(`/live-streaming/details?aucId=${cardData.id}`);
        } else if (headerType === "lots") {
            if (location.pathname === "/inventory") {
                localStorage.setItem('inventory', 'true');
            }
            navigate(`/auction/lots/details?lotId=${cardData.id}`);
        } else {
            navigate(`/auction/details?aucId=${cardData.id}`);
        }
    };

    const handleJoin = (id: number) => {
        navigate(`/live-streaming/details?aucId=${id}`);
    }

    const handleNextLot = (id: number) => {
        console.log("Join live stream: ", id)
    }

    const handleViewCatalog = (id: number) => {
        // dispatch(setSelectedAuction(id));
        navigate(`/auction/lots?aucId=${id}`)
    }

    const handleMoveLot = (id: number) => {
        setMoveLotId(id)
        setMoveModalOpen(true);
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
                {headerType === "auction" || headerType === "live" ?
                    <AuctionDetails auctionDetails={cardData.details} />
                    : <HomeDetails homeData={cardData} />
                }

                {/* Action Buttons */}
                <Box className={classes.actionButtons}>
                    {headerType === "live" ?
                        <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleJoin(cardData.id)}>
                            Join
                        </Button>
                        : headerType === "lots" && cardData?.isPast ?
                            <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleMoveLot(cardData.id)}>
                                Move
                            </Button>
                            : null
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
