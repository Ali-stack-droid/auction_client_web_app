import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme";
import useLandingPageStyles from "./LandingPageStyles";
import CustomTextField from "../custom-components/CustomTextField";
import {
    Search as SearchIcon,
} from '@mui/icons-material';


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
            <Grid container spacing={3} sx={{ marginBottom: 4, p: "20px 0" }}>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/pngs/placeholder.png"
                            alt="Card 1"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/pngs/placeholder.png"
                            alt="Card 2"
                        />
                    </Card>
                </Grid>
            </Grid>

            {/* Center Title + Three Cards Section */}
            <Box sx={{ textAlign: "center", marginBottom: 4 }}>
                <Typography variant="h5" color="primary">
                    Explore Our Auctions
                </Typography>
            </Box>
            <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                {[1, 2, 3].map((_, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6">Card Title {index + 1}</Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    Description of the card goes here.
                                </Typography>
                                <Button variant="contained" color="primary">
                                    View More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Five Cards Section */}
            <Grid container spacing={3}>
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
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Button variant="contained" color="primary">
                    Show More
                </Button>
            </Box>
        </Box>
    );
};

export default LandingPage;
