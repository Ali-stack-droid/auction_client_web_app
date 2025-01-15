import {
    Box,
    Card,
    CardMedia,
    Typography,
    Button,
    Avatar,
    CardContent,
    Grid,
    Rating,
    Stack,

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

            {/* <Box sx={{ py: 18, px: 4 }}>
                <Grid container spacing={4} alignItems="center">
                   
                    <Grid item xs={12} md={6}>
                        <Typography
                            sx={{ fontWeight: "700", fontSize: '40px', color: "#021526", mb: '14px' }}
                        >
                            What <Typography className={classes.member}
                                color={'primary'} component={'span'}>Our Member's</Typography>
                            <br />
                            Saying About Us
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary", mb: 4, maxWidth: '423px' }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem
                            velit viverra amet faucibus.
                        </Typography>
                      
                        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: "center" }}>

                            <Stack direction="row" spacing={-2} sx={{ alignItems: "center" }}>
                                {["/assets/pngs/user1.png", "/assets/pngs/user2.png", "/assets/pngs/user3.png", "/assets/pngs/user4.png", "/assets/pngs/user5.png", "/assets/pngs/user6.png"].map((src, index) => (
                                    <Avatar
                                        key={index}
                                        alt={`User ${index + 1}`}
                                        src={src}
                                        sx={{
                                            border: "2px solid white",
                                            width: 48,
                                            height: 48,
                                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                ))}
                            </Stack>
                            <Typography sx={{ ml: 2, fontWeight: 600, fontSize: '16px' }}>
                                100+ Reviews
                            </Typography>
                        </Box>

                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card className={classes.ratingCard}>
                            <CardContent>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            alt="Jane Cooper"
                                            src="/assets/pngs/user4.png"
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px' }}>
                                                Jane Cooper
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: "text.secondary" }}
                                            >
                                                12/4/17
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Rating
                                        value={5}
                                        size="large"
                                        readOnly
                                        sx={{ color: "#FFD700" }}
                                    />
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary", mt: '45px', fontSize: '16px', fontWeight: 400 }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sem velit viverra amet faucibus. Lorem ipsum dolor sit
                                    amet, consectetur adipiscing elit. Sem velit viverra amet
                                    faucibus. Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sem velit viverra amet faucibus.
                                </Typography>


                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box> */}
        </Box>
    );
};

export default LandingPage;
