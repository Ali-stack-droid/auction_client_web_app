import { Box, Button, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';
import { useState, useEffect } from 'react';
import theme from '../../../../theme';

const LotDetails = ({ lotData }: any) => {
    const classes = useAuctionDetailStyles();
    const [countdown, setCountdown] = useState<string>('00:00:00');

    useEffect(() => {
        const parseDateTime = () => {
            if (!lotData || !lotData.date || !lotData.time) {
                console.error("Invalid lotData:", lotData);
                return { startDateTime: new Date(0), endDateTime: new Date(0) }; // Default to epoch time
            }

            const [startDate, endDate] = lotData.date.split(' to ');
            const [startTime, endTime] = lotData.time.split(' to ');

            return {
                startDateTime: new Date(`${startDate} ${startTime}`),
                endDateTime: new Date(`${endDate} ${endTime}`),
            };
        };


        const calculateCountdown = () => {
            const { endDateTime } = parseDateTime();

            if (!endDateTime) {
                console.error("Invalid endDateTime:", endDateTime);
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
    }, [lotData.date, lotData.time]);

    return (
        <Box className={classes.container}>

            <Box mb={'20px'} display={'flex'} alignItems={'center'}>
                <Typography color='primary' fontSize={'16px'} fontWeight={700}>
                    Lot  #{lotData.id}
                </Typography>

                {/* Date Range */}
                <Box ml={'20px'} className={`${classes.iconText} ${classes.flexItem}`}>
                    <WatchLaterRoundedIcon fontSize="small" color="primary" />
                    {countdown !== "" ?
                        <Box display={"flex"} flex={1} >
                            <Typography className={classes.text} sx={{ color: "rgba(33, 33, 33, 1)", whiteSpace: 'normal', wordBreak: 'break-word' }}>
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

        </Box >
    );
};

export default LotDetails;
