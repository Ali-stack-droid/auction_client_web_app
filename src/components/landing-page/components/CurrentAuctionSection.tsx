import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import AuctionCard from '../../auction/auction-components/AuctionCard'
import auctionData from '../../auction/auctionData'
import useLandingPageStyles from '../LandingPageStyles'

const CurrentAuctions = () => {
    const classes = useLandingPageStyles();

    return (
        <Box className={classes.locationSection} py={10}>
            <Box sx={{ textAlign: "center", marginBottom: '54px' }}>
                <Typography className={classes.headingStyles} color="primary">
                    Our Current Auctions
                </Typography>
            </Box>
            <Box className={classes.locationCards} sx={{ marginBottom: '40px' }}>
                {auctionData.slice(0, 3).map((auction, index) => (

                    <Box sx={{ width: "100%" }} key={index}>
                        <AuctionCard
                            headerType={"auction"}
                            cardData={auction}
                            handleEdit={() => { }}
                            handleDelete={() => { }}
                            handleMoveModal={() => { }}
                        />
                    </Box>
                ))}
            </Box>

            <Button className={classes.allAuctions} variant={"contained"} >
                View  All Auctions
            </Button>
        </Box>
    )
}

export default CurrentAuctions
