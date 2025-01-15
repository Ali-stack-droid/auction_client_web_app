import { Box, Button, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';

const AuctionDetails = ({ auctionDetails }: any) => {
    const classes = useAuctionDetailStyles();

    return (
        <Box className={classes.container}>

            <Typography color='primary' fontSize={'16px'} fontWeight={700}>
                ID : #30
            </Typography>

            <Box mt={'8px'} mb={'20px'} className={classes.row}>
                {/* Location */}
                <Box className={classes.iconText}>
                    <PlaceIcon fontSize="small" color="primary" />
                    <Typography className={classes.text}>{auctionDetails.location}</Typography>
                </Box>
                {/* Date Range */}
                <Box className={`${classes.iconText} ${classes.flexItem}`}>
                    <WatchLaterRoundedIcon fontSize="small" color="primary" />
                    <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        12 : 30 : 44 :01
                    </Typography>
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
