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
import theme from "../../theme";
import useLandingPageStyles from "./LandingPageStyles";
import CustomTextField from "../custom-components/CustomTextField";
import {
    Search as SearchIcon,
} from '@mui/icons-material';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';


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
        <Box sx={{ padding: 2 }}>
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
            <Grid container spacing={2} className={classes.mediaCards}>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
            </Grid>

            {/* Center Title + Three Cards Section */}

            <Box className={classes.locationSection} py={10}>
                <Box sx={{ textAlign: "center", marginBottom: '54px' }}>
                    <Typography className={classes.headingStyles} color="primary">
                        Current Auctions By Locations                     
                    </Typography>
                </Box>
                <Grid className={classes.locationCards} container spacing={3} sx={{ marginBottom: 4 }}>
                    {[1, 2, 3].map((_, index) => (
                        // <Grid item xs={12} sm={4} key={index}>
                        //     <Card elevation={3}>
                        //         <CardContent>
                        //             <Typography variant="h6">Card Title {index + 1}</Typography>
                        //             <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        //                 Description of the card goes here.
                        //             </Typography>
                        //             <Button variant="contained" color="primary">
                        //                 View More
                        //             </Button>
                        //         </CardContent>
                        //     </Card>
                        // </Grid>
                             
                        <Card
                        sx={{
                            maxWidth: 345,
                            borderRadius: "16px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#ffffff",
                            overflow: "hidden",
                        }}
                    >
                        {/* Image Section */}
                        <CardMedia
                            component="img"
                            height="180"
                            image="/assets/pngs/land6.png" // Replace with your image path
                            alt="New York Jersey, USA"
                            sx={{
                                borderTopLeftRadius: "16px",
                                borderTopRightRadius: "16px",
                                objectFit: "cover",
                            }}
                        />
            
                        {/* Content Section */}
                        <CardContent sx={{ textAlign: "center" }}>
                            {/* Location */}
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ fontWeight: 600, marginBottom: 1 }}
                            >
                                New York Jersey, USA
                            </Typography>
            
                            {/* Date Section */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                    marginBottom: 2,
                                    color: "#757575",
                                }}
                            >
                                <CalendarTodayIcon fontSize="small" />
                                <Typography variant="body2">12/20/2024</Typography>
                            </Box>
            
                            {/* Button */}
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#001F54",
                                    color: "#ffffff",
                                    textTransform: "none",
                                    padding: "6px 16px",
                                    fontWeight: 500,
                                    "&:hover": {
                                        backgroundColor: "#00337F",
                                    },
                                }}
                            >
                                View Auction
                            </Button>
                        </CardContent>
                    </Card>
                    ))}
                </Grid>
            </Box>



            {/*Tools Section */}
            <Box sx={{ backgroundColor: "#f9f9f9", py: 10 }}>
            
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    marginBottom: '54px',
                }}
                className={classes.headingStyles}
            >
                All the tools you need in one place
            </Typography>

            {/* Cards and Image Section */}
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                {/* Left Column */}
                <Grid item xs={12} sm={6} md={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card className={classes.cardStyles}>
                                <CardContent>
                                    <Typography variant="h6" className={classes.titleStyles}>
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
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            backgroundColor: "#001F54",
                                            "&:hover": {
                                                backgroundColor: "#002D7E",
                                            },
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.cardStyles}>
                                <CardContent>
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
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            backgroundColor: "#001F54",
                                            "&:hover": {
                                                backgroundColor: "#002D7E",
                                            },
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Center Image */}
                <Grid item xs={12} sm={6} md={6}>
                    <Box
                        sx={{
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
                            }}
                        />
                    </Box>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} sm={6} md={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card className={classes.cardStyles}>
                                <CardContent>
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
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            backgroundColor: "#001F54",
                                            "&:hover": {
                                                backgroundColor: "#002D7E",
                                            },
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.cardStyles}>
                                <CardContent>
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
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            backgroundColor: "#001F54",
                                            "&:hover": {
                                                backgroundColor: "#002D7E",
                                            },
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>


            {/* Five Cards Section */}
            {/* <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="150"
                            image="/assets/images/card3.jpg"
                            alt="Card 3"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="150"
                            image="/assets/images/card4.jpg"
                            alt="Card 4"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/images/card5.jpg"
                            alt="Big Card"
                        />
                    </Card>
                </Grid>
            </Grid>

            {/* Show More Section */}
            {/* <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Button variant="contained" color="primary">
                    Show More
                </Button>
            </Box>  */}



        <Box sx={{ backgroundColor: "#f9f9f9", py: 6, px: 4 }}>
            <Grid container spacing={4} alignItems="center">
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", color: "#001F54", mb: 2 }}
                    >
                        What Our Member's
                        <br/>
                        Saying About Us
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: "text.secondary", mb: 4 }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem
                        velit viverra amet faucibus.
                    </Typography>
                    {/* Avatars */}
                    <Stack direction="row" spacing={-1} sx={{ alignItems: "center" }}>
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
                        <Typography sx={{ ml: 2, fontWeight: "bold" }}>
                            100+ Reviews
                        </Typography>
                    </Stack>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            borderRadius: "12px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <CardContent>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

                            <Stack direction="row" spacing={2} alignItems="center">
                                {/* Avatar */}
                                <Avatar
                                    alt="Jane Cooper"
                                    src="/images/jane-cooper.png"
                                    sx={{ width: 56, height: 56 }}
                                />
                                {/* Name and Date */}
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
                                readOnly
                                sx={{ color: "#FFD700" }}
                            />
                            </Box>

                            {/* Review Text */}
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", mt: 2 }}
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
