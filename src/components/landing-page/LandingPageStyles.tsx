import { makeStyles } from "@mui/styles";

const useLandingPageStyles = makeStyles((theme: any) => ({
    heading: {
        fontSize: '40px',
        fontWeight: 600,
        lineHeight: '55px',
        color: theme.palette.primary.main5
    },
    headingSpan: {
        fontSize: '40px',
        fontWeight: 600,
        lineHeight: '55px',
        color: theme.palette.primary.main
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    searchField: {
        height: '40px',
        width: '70%',
        // marginBottom: "40px"
    },
    searchButton: {
        borderRadius: '15px',
        margin: "10px 0",
        height: '40px',
        width: '140px',
        textTransform: 'none'
    },
    card: {
        borderRadius: '20px',
        padding: '10px'
        // height: '50%'
    },
    mediaCards: {
        paddingTop: '95px',
        paddingBottom: '36px'
    },
    headingStyles: {
        fontSize: '40px',
        fontWeight: 600
    },
    locationSection: {
        // background: 'rgba(244, 244, 244, 0.5)',
        display: 'flex',
        flexDirection: 'column'
    },
    locationCards: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '16px'
    },
    cardStyles: {
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: '1px solid #E2E8F0'
    },
    titleStyles: {
        fontSize: '22px',
        fontWeight: 600,
        color: "#001F54",
        marginBottom: "40px",
    },
    allAuctions: {
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        height: '64px',
        width: '400px',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '18px'
    },
    member: {
        fontSize: '40px',
        fontWeight: 700
    },
    ratingCard: {
        borderRadius: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        border: '1px solid #A8A8A8',
        maxWidth: '590px',
        padding: '54px 44px 75px 52px'
    }
}));

export default useLandingPageStyles;
