import {
    Box,
    Card,
    CardMedia,
    Typography,
    Button,

} from "@mui/material";
import { styled } from "@mui/material/styles";
import useLandingPageStyles from "./LandingPageStyles";
import CustomTextField from "../custom-components/CustomTextField";
import AuctionCard from "../auction/auction-components/AuctionCard";
import auctionData from "../auction/auctionData";
import AllTools from "./components/AllTools";
import Feedback from "./components/Feedback";
import FeaturedAuctions from "./components/FeaturedAuctions";
import CurrentAuctionSection from "./components/CurrentAuctionSection";
import CurrentAuctionsByLocation from "./components/CurrentAuctionsByLocation";
import CardMediaSection from "./components/CardMediaSection";


const AnimatedText = styled(Typography)({
    animation: "fadeIn 2s ease-in-out",
    "@keyframes fadeIn": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
    },
});


const LandingPage = () => {
    const classes = useLandingPageStyles()
    return (
        <Box>
            {/* Animated Text Section */}
            <Box sx={{ textAlign: "center", marginBottom: 4, padding: "0 150px" }}>
                <AnimatedText className={classes.heading}>
                    Easy to bid,
                    <Typography component={'span'} className={classes.headingSpan}>
                        &nbsp;simple process
                    </Typography>
                    , and no hidden fees - your ultimate auction
                    <Typography component={'span'} className={classes.headingSpan}>
                        &nbsp;experience&nbsp;
                    </Typography>
                    starts here!
                </AnimatedText>
            </Box>

            {/* Search Bar Section */}
            <Box className={classes.searchBar}>
                <CustomTextField
                    // value={searchTerm}
                    // onChange={handleSearchChange}
                    placeholder="Search for auction listings here..."
                    className={classes.searchField}
                    InputProps={{
                        endAdornment: (
                            <Button variant={'contained'} className={classes.searchButton}>
                                Search
                            </Button>
                        ),
                    }}
                />
            </Box>

            {/* Card Media Section */}
            <CardMediaSection />

            {/* Current Auctions By LocationSection */}
            <CurrentAuctionsByLocation />

            {/* All Tools Section*/}
            <AllTools />

            {/* Current Auctions Section */}
            <CurrentAuctionSection />

            {/* Featured items Section */}
            <FeaturedAuctions />

            {/* About us Section */}
            <Feedback />

        </Box>
    );
};

export default LandingPage;
