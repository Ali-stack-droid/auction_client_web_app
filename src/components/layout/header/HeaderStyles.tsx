import { makeStyles } from '@mui/styles';
import theme from '../../../theme';

const useHeaderStyles = makeStyles({
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        padding: "20px 0",
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: "20px",
        marginLeft: "20px",
        fontWeight: "600"
    }
});

export default useHeaderStyles;
