import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AuctionCard from '../../auction/auction-components/AuctionCard'
import auctionData from '../../auction/auctionData'
import useLandingPageStyles from '../LandingPageStyles'
import { getFeaturedAuctions, getFeaturedAuctionsByLocation } from '../../Services/Methods'

const CurrentAuctionsByLocation = () => {
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
            let response = await getFeaturedAuctionsByLocation()
            if (response.data && response.data.length > 0) {

                const currentLocationAuctions = response.data
                console.log(currentLocationAuctions)
                const updatedData = currentLocationAuctions[0].Auctions.map((item: any) => ({
                    id: item.Id,
                    name: item.Name || "Monthly Public Auction",
                    image: item.Image,
                    date: item.StartDate,
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
        <Box className={classes.locationSection} pb={8}>
            {filteredData.length > 0 &&
                <Box sx={{ textAlign: "center", marginBottom: '54px' }}>
                    <Typography className={classes.heading} color="primary">
                        Current
                        <Typography component={'span'} className={classes.headingSpan}>
                            &nbsp;Auctions&nbsp;
                        </Typography>
                        By Locations
                    </Typography>
                </Box>
            }
            <Box className={classes.locationCards} sx={{ marginBottom: 4 }}>
                {filteredData.length === 1
                    ? Array(3).fill(filteredData[0]).map((auction: any, index: number) => (
                        <Box className={classes.currentAuctionCard} key={index}>
                            <AuctionCard
                                headerType={"home"}
                                cardData={auction}
                            />
                        </Box>
                    ))
                    : filteredData.map((auction: any, index: number) => (
                        <Box className={classes.currentAuctionCard} key={index}>
                            <AuctionCard
                                headerType={"home"}
                                cardData={auction}
                            />
                        </Box>
                    ))
                }

            </Box>
        </Box>
    )
}

export default CurrentAuctionsByLocation
