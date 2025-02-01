import { Box, Typography, Button } from '@mui/material'
import AuctionCard from '../../auction/auction-components/AuctionCard'
import auctionData from '../../auction/auctionData'
import useLandingPageStyles from '../LandingPageStyles'
import { getFeaturedLots, getWatchlist } from '../../Services/Methods'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const FeaturedAuctions = () => {
    const classes = useLandingPageStyles()
    const location = useLocation();
    const navigate = useNavigate()
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [filteredData, setFilteredData]: any = useState([]);


    const [favouriteLots, setFavouriteLots]: any = useState([]);

    const user: any = sessionStorage.getItem('authToken') || Cookies.get('user');
    const clientId = (sessionStorage.getItem('authToken') ?
        JSON.parse(user).id : Cookies.get('user')
            ? JSON.parse(user).id : '')

    useEffect(() => {

        const fetchWatchlist = async () => {

            try {
                // Critical request:
                const response = await getWatchlist(clientId)
                if (response.data && response.data.length > 0) {
                    const allLots = response.data.map((item: any) => item.Lots);

                    const updatedData = allLots.map((item: any) => ({
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
                    setFavouriteLots(updatedData);
                } else {
                    setFavouriteLots([]);
                }

            } catch (error) {
                console.error('Error fetching auction data:', error);
            }
        };
        fetchWatchlist();

    }, [])

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchAuctionData();
        }
    }, [location.pathname])


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

    const isFaverited = (lotId: any) => {
        return favouriteLots.some((lot: any) => lot.id === lotId);
    }


    return (
        <Box className={classes.locationSection} py={10}>
            <Box sx={{ textAlign: "center", marginBottom: '54px' }}>
                <Typography className={classes.headingStyles} color="primary">
                    Our Featured Items or Some Current Listing
                </Typography>
            </Box>
            <Box className={classes.locationCards} sx={{ marginBottom: '40px' }}>
                {filteredData.slice(0, 3).map((auction: any, index: number) => (
                    <Box sx={{
                        maxWidth: "386px",
                        width: '-webkit-fill-available',
                    }} key={index}>
                        <AuctionCard
                            headerType={"lots"}
                            cardData={auction}
                            isFaverited={isFaverited(auction.id)}
                        />
                    </Box>
                ))}
            </Box>

            <Button className={classes.allAuctions} variant={"contained"} onClick={handleViewAllListings}>
                View  All Listings
            </Button>

        </Box>
    )
}

export default FeaturedAuctions