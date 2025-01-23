import { Box, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AuctionCard from '../../auction/auction-components/AuctionCard'
import auctionData from '../../auction/auctionData'
import useLandingPageStyles from '../LandingPageStyles'
import { getFeaturedAuctions, getFeaturedLots } from '../../Services/Methods'

const CurrentAuctions = () => {
    const classes = useLandingPageStyles();

    const [isFetchingData, setIsFetchingData] = useState(false);
    const [filteredData, setFilteredData]: any = useState([]);

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchAuctionData();
        }
    }, [])

    const fetchAuctionData = async () => {
        try {
            // Critical request:
            let response = await getFeaturedAuctions()
            if (response.data && response.data.length > 0) {

                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    name: item.Name,
                    image: item.Image,
                    date: `${item.StartDate} to ${item.EndDate}`,
                    time: `${item.StartTime} to ${item.EndTime}`,
                    details: {
                        location: `${item.City}, ${item.Country}`,
                        dateRange: `${item.StartDate} to ${item.EndDate}`,
                        lotsAvailable: item.TotalLots // Replace with actual data if available
                    }
                }));
                setFilteredData(updatedData);
            } else {
                setFilteredData([]);
            }

        } catch (error) {
            console.error('Error fetching auction data:', error);
        } finally {
            setIsFetchingData(false)
        }
    };

    return (
        <Box className={classes.locationSection} py={10}>
            <Box sx={{ textAlign: "center", marginBottom: '54px' }}>
                <Typography className={classes.headingStyles} color="primary">
                    Our Current Auctions
                </Typography>
            </Box>
            <Box className={classes.locationCards} sx={{ marginBottom: '40px' }}>
                {filteredData.length === 1
                    ? Array(3).fill(filteredData[0]).map((auction: any, index: number) => (
                        <Box sx={{ width: "100%" }} key={index}>
                            <AuctionCard
                                headerType={"auction"}
                                cardData={auction}
                            />
                        </Box>
                    ))
                    : filteredData.map((auction: any, index: number) => (
                        <Box sx={{ width: "100%" }} key={index}>
                            <AuctionCard
                                headerType={"auction"}
                                cardData={auction}
                            />
                        </Box>
                    ))
                }
            </Box>

            <Button className={classes.allAuctions} variant={"contained"} >
                View  All Auctions
            </Button>
        </Box >
    )
}

export default CurrentAuctions
