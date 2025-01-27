import { Box, Typography, Button } from '@mui/material'
import AuctionCard from '../../auction/auction-components/AuctionCard'
import auctionData from '../../auction/auctionData'
import useLandingPageStyles from '../LandingPageStyles'
import { getFeaturedLots } from '../../Services/Methods'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FeaturedAuctions = () => {
    const classes = useLandingPageStyles()
    const navigate = useNavigate()
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
            let response = await getFeaturedLots()
            if (response.data && response.data.length > 0) {

                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    name: item.Name || item.ShortDescription,
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

    const handleViewAllListings = () => {
        navigate('/listings')
    }
    return (
        <Box className={classes.locationSection} py={10}>
            <Box sx={{ textAlign: "center", marginBottom: '54px' }}>
                <Typography className={classes.headingStyles} color="primary">
                    Our Featured Items or Some Current Listing
                </Typography>
            </Box>
            <Box className={classes.locationCards} sx={{ marginBottom: '40px' }}>
                {filteredData.length === 1 || filteredData.length === 2
                    ? Array(3).fill(filteredData[0]).map((auction: any, index: number) => (
                        <Box sx={{ width: "100%" }} key={index}>
                            <AuctionCard
                                headerType={"lots"}
                                cardData={auction}
                            />
                        </Box>
                    ))
                    : filteredData.map((auction: any, index: number) => (
                        <Box sx={{ width: "100%" }} key={index}>
                            <AuctionCard
                                headerType={"lots"}
                                cardData={auction}
                            />
                        </Box>
                    ))
                }
            </Box>

            <Button className={classes.allAuctions} variant={"contained"} onClick={handleViewAllListings}>
                View  All Listings
            </Button>

        </Box>
    )
}

export default FeaturedAuctions