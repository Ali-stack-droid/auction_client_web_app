
import { makeStyles } from '@mui/styles';

const CartStyles = makeStyles((theme: any) => ({
    label: {
        fontSize: '15px',
        fontWeight: 600,
        color: theme.palette.primary.main10,
        paddingBottom: '10px'
    },
    heading: {
        fontSize: '22px',
        fontWeight: 500,
        color: '#012868',
        marginBottom: '10px'
    },
    pageHeading: {
        fontSize: '40px',
        fontWeight: 600,
        color: '#2D3748',
        maxWidth: '645px',
        marginBottom: '40px'
    },
    gridStyle: {
        padding: '0 !important',
    },
    error: {
        marginBottom: '16px',
    },
    payment: {
        fontSize: '16px',
        fontWeight: 300,
        marginBottom: '10px'
    },
    paper: {
        boxShadow: 'none',
        padding: '10px 16px',
        borderRadius: '15px',
        border: "1px solid #E0E0E0"
    }

}));

export default CartStyles;
