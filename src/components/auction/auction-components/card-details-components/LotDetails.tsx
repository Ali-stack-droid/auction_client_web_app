import { Box, Button, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';

const LotDetails = ({ lotDetails }: any) => {
    const classes = useAuctionDetailStyles();

    return (
        <Box className={classes.container}>

            <Box mb={'20px'} display={'flex'} alignItems={'center'}>
                <Typography color='primary' fontSize={'16px'} fontWeight={700}>
                    Lot : #30
                </Typography>

                {/* Date Range */}
                <Box ml={'20px'} className={`${classes.iconText} ${classes.flexItem}`}>
                    <WatchLaterRoundedIcon fontSize="small" color="primary" />
                    <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        12 : 30 : 44 :01
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default LotDetails;
