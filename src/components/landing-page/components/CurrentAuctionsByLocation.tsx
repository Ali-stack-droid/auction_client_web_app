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
                setFilteredData(updatedData.length > 2 ? updatedData.slice(0, 3) : updatedData);
            } else {
                setFilteredData([]);
            }

        } catch (error) {
        } finally {
            setIsFetchingData(false)
        }
    };



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
                {filteredData.length ?
                    filteredData.map((auction: any, index: number) => (
                        <Box className={classes.currentAuctionCard} key={index}>
                            <AuctionCard
                                headerType={"home"}
                                cardData={auction}
                            />
                        </Box>
                    ))
                    :
                    <Box>
                        <Box p={4}>
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/pngs/norecord.png`}
                                alt="No Record"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </Box>
                        <Typography variant="h6" color="textSecondary">
                            No auctions found!
                        </Typography>
                    </Box>
                }

            </Box>
        </Box>
    )
}

export default CurrentAuctionsByLocation
