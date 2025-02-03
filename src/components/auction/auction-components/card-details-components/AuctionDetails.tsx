import { Box, Button, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';
import { useEffect, useState } from 'react';
import theme from '../../../../theme';

const AuctionDetails = ({ auction }: any) => {
    const classes = useAuctionDetailStyles();
    const [countdown, setCountdown] = useState<string>('00:00:00');

    useEffect(() => {
        const parseDateTime = () => {
            if (!auction || !auction.date || !auction.time) {
                return { startDateTime: new Date(0), endDateTime: new Date(0) }; // Default to epoch time
            }

            const [startDate, endDate] = auction.date.split(' to ');
            const [startTime, endTime] = auction.time.split(' to ');

            return {
                startDateTime: new Date(`${startDate} ${startTime}`),
                endDateTime: new Date(`${endDate} ${endTime}`),
            };
        };


        const calculateCountdown = () => {
            const { endDateTime } = parseDateTime();

            if (!endDateTime) {
                setCountdown(''); // Auction ended or invalid data
                return;
            }

            const now = new Date();
            const remainingTime = endDateTime.getTime() - now.getTime();

            if (remainingTime > 0) {
                const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                const seconds = Math.floor((remainingTime / 1000) % 60);

                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setCountdown(''); // Auction ended
            }
        };


        calculateCountdown(); // Initial calculation
        const interval = setInterval(calculateCountdown, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [auction?.date, auction?.time]);

    return (
        <Box className={classes.container}>

            <Typography color='primary' fontSize={'16px'} fontWeight={700}>
                ID : #{auction?.id}
            </Typography>

            <Box mt={'8px'} mb={'20px'} className={classes.row}>
                {/* Location */}
                <Box className={classes.iconText}>
                    <PlaceIcon fontSize="small" color="primary" />
                    <Typography className={classes.text}>{auction?.details.location}</Typography>
                </Box>
                {/* Date Range */}
                <Box className={`${classes.iconText} ${classes.flexItem}`}>
                    <WatchLaterRoundedIcon fontSize="small" color="primary" />
                    {countdown !== "" ?
                        <Box display={"flex"} flex={1} >
                            <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                &nbsp;{countdown}
                            </Typography>
                        </Box>
                        :
                        <Box display={"flex"} flex={0.7} >
                            <Typography color={theme.palette.secondary.main} whiteSpace={'nowrap'}>
                                Lot Ended
                            </Typography>
                        </Box>
                    }
                </Box>
            </Box>

            {/* Row 2 */}
            {/* Lots Available */}
            {/* <Box className={classes.row}>
                <Box className={classes.iconText}>
                    <ViewInArRoundedIcon fontSize="small" color="primary" />
                    <Typography className={classes.text}>
                        {auctionDetails.lotsAvailable > 0 ? auctionDetails.lotsAvailable : "No"}&nbsp;
                        {auctionDetails.lotsAvailable > 1 ? "Lots" : "Lot"}&nbsp;Available
                    </Typography>
                </Box>
            </Box> */}
        </Box>
    );
};

export default AuctionDetails;
