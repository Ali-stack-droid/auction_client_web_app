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
        marginBottom: "40px"
    },
    searchButton: {
        borderRadius: '15px',
        margin: "10px 0",
        height: '40px',
        width: '140px',
        textTransform: 'none'
    },
    card: {
        border: '1px solid red',
        borderRadius: '20px',
        // height: '50%'
    }
}));

export default useLandingPageStyles;
