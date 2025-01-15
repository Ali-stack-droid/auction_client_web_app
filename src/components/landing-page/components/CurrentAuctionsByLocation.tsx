import { Box, Typography } from '@mui/material'
import React from 'react'
import AuctionCard from '../../auction/auction-components/AuctionCard'
import auctionData from '../../auction/auctionData'
import useLandingPageStyles from '../LandingPageStyles'

const CurrentAuctionsByLocation = () => {
    const classes = useLandingPageStyles();
    return (
        <Box className={classes.locationSection} pb={8}>
            <Box sx={{ textAlign: "center", marginBottom: '54px' }}>
                <Typography className={classes.heading} color="primary">
                    Current
                    <Typography component={'span'} className={classes.headingSpan}>
                        &nbsp;Auctions&nbsp;
                    </Typography>
                    By Locations
                </Typography>
            </Box>
            <Box className={classes.locationCards} sx={{ marginBottom: 4 }}>
                {auctionData.slice(0, 3).map((auction, index) => (

                    <Box sx={{ width: "100%" }} key={index}>
                        <AuctionCard
                            headerType={"home"}
                            cardData={auction}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default CurrentAuctionsByLocation
