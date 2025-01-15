import { Box, Typography, Button } from '@mui/material'
import AuctionCard from '../../auction/auction-components/AuctionCard'
import auctionData from '../../auction/auctionData'
import useLandingPageStyles from '../LandingPageStyles'

const FeaturedAuctions = () => {
    const classes = useLandingPageStyles()

    return (
        <Box className={classes.locationSection} py={10}>
            <Box sx={{ textAlign: "center", marginBottom: '54px' }}>
                <Typography className={classes.headingStyles} color="primary">
                    Our Featured Items or Some Current Listing
                </Typography>
            </Box>
            <Box className={classes.locationCards} sx={{ marginBottom: '40px' }}>
                {auctionData.slice(0, 3).map((auction, index) => (

                    <Box sx={{ width: "100%" }} key={index}>
                        <AuctionCard
                            headerType={"lots"}
                            cardData={auction}
                            handleEdit={() => { }}
                            handleDelete={() => { }}
                            handleMoveModal={() => { }}
                        />
                    </Box>
                ))}
            </Box>

            <Button className={classes.allAuctions} variant={"contained"} >
                View  All Listings
            </Button>

        </Box>
    )
}

export default FeaturedAuctions