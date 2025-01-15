import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Avatar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useLandingPageStyles from "./LandingPageStyles";
import CustomTextField from "../custom-components/CustomTextField";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import AuctionCard from "../auction/auction-components/AuctionCard";
import auctionData from "../auction/auctionData";


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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "95px 0" }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: "16px", width: "100%", }}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            sx={{
                                maxHeight: "423px",
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: '20px'
                            }}
                            image="/assets/pngs/land1.png"
                            alt="Card 1"
                        />
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            sx={{
                                maxHeight: "423px",
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: '20px'

                            }}
                            image="/assets/pngs/land2.png"
                            alt="Card 2"
                        />
                    </Card>
                </Box>
            </Box>

            {/* Center Title + Three Cards Section */}

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

            {/* All Tools Section*/}
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        marginBottom: '54px',
                    }}
                    className={classes.heading}
                >
                    All the tools you
                    <Typography className={classes.headingSpan} component={'span'}>
                        &nbsp;need&nbsp;
                    </Typography>
                    in one place
                </Typography>

                <Box className={classes.toolsWrapper}>
                    <Box className={classes.toolsInfo}>

                        <Card className={classes.cardStyles}>
                            <Box className={classes.toolBox}>
                                <Typography className={classes.titleStyles}>
                                    Current and Upcoming Auctions:
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    Upload the blood test reports in PDF, JPG format and get
                                    the AI-generated blood report. Get health recommendations
                                    and chat about it.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowOutwardIcon />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 500,
                                        backgroundColor: "#001F54",
                                        "&:hover": {
                                            backgroundColor: "#002D7E",
                                        },
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Card>
                        <Card className={classes.cardStyles}>
                            <Box className={classes.toolBox}>
                                <Typography variant="h6" className={classes.titleStyles}>
                                    Past Auctions:
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    User enters the health data and our platform will use GPT-4
                                    to give you the right suggestions about your health.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowOutwardIcon />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 500,
                                        backgroundColor: "#001F54",
                                        "&:hover": {
                                            backgroundColor: "#002D7E",
                                        },
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Card>
                    </Box>

                    {/* Center Image */}
                    <Box
                        sx={{
                            flex: 0.6,
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="/assets/pngs/post-bidding.png"
                            alt="Auction Illustration"
                            style={{
                                maxWidth: "100%",
                                borderRadius: "12px",
                                padding: '10px',
                                border: '1px solid #E2E8F0'
                            }}
                        />
                    </Box>

                    {/* Right Column */}
                    <Box className={classes.toolsInfo}>
                        <Card className={classes.cardStyles}>
                            <Box className={classes.toolBox}>
                                <Typography variant="h6" className={classes.titleStyles}>
                                    Shipping Services:
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    Our platform gets the DNA data of the user, then
                                    integrates and provides personalized insights based on
                                    predisposition.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowOutwardIcon />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 500,
                                        backgroundColor: "#001F54",
                                        "&:hover": {
                                            backgroundColor: "#002D7E",
                                        },
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Card>
                        <Card className={classes.cardStyles}>
                            <Box className={classes.toolBox}>
                                <Typography variant="h6" className={classes.titleStyles}>
                                    Featured Products:
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    Get into with our professional nutritionist and trainers to
                                    get maximum health benefits.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<ArrowOutwardIcon />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 500,
                                        backgroundColor: "#001F54",
                                        "&:hover": {
                                            backgroundColor: "#002D7E",
                                        },
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </Box>

            {/* Current Auctions Section */}

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


            {/* Featured items Section */}

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

            {/* About us Section */}

            <Box sx={{ py: 18, px: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Left Section */}
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
                        {/* Avatars */}
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

                    {/* Right Section */}
                    <Grid item xs={12} md={6}>
                        <Card className={classes.ratingCard}>
                            <CardContent>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {/* Avatar */}
                                        <Avatar
                                            alt="Jane Cooper"
                                            src="/assets/pngs/user4.png"
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        {/* Name and Date */}
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

                                    {/* Rating */}
                                    <Rating
                                        value={5}
                                        size="large"
                                        readOnly
                                        sx={{ color: "#FFD700" }}
                                    />
                                </Box>

                                {/* Review Text */}
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
            </Box>
        </Box>
    );
};

export default LandingPage;
