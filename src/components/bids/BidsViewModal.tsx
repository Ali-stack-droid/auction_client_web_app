import { Dialog, DialogContent, IconButton, Typography, Box, Divider } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import useWinnerModalStyle from '../auction/detail-pages/detail-pages-components/WinnerModalStyles';

const BidsViewModal = ({ open, onClose, invoice }: any) => {
    const classes = useWinnerModalStyle();

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Box p={2}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "5px" }}>
                    <Typography variant="h5" className={classes.title}>
                        Bid Details
                    </Typography>
                    <IconButton onClick={onClose}>
                        <ClearRoundedIcon
                            sx={{
                                color: 'black',
                                padding: "1px",
                                border: "1px solid #676767",
                                borderRadius: "50px"
                            }}
                        />
                    </IconButton>
                </Box>
                <Divider sx={{ py: 1 }} />

                <DialogContent className={classes.modalContent}>
                    {/* Bid Details */}
                    {invoice ? (
                        <Box style={{ padding: '10px' }}>
                            {[
                                { label: 'ID', value: `#${invoice.id}` },
                                { label: 'Product Name', value: invoice.productName },
                                { label: 'Highest Bidder Name', value: invoice.highestBidderName },
                                { label: 'Total Bids', value: invoice.totalBids },
                                { label: 'Current Price', value: `$${invoice.currentPrice}` },
                            ].map((detail, index) => (
                                <Box
                                    key={index}
                                    className={classes.bidderDetails}
                                >
                                    <Box sx={{ flex: 0.3 }}>
                                        <Typography textAlign={'left'} className={classes.bidderHeading}>
                                            {detail.label}:
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 0.7 }}>
                                        <Typography textAlign={'left'} className={classes.paymentValue}>
                                            {detail.value}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Box className={classes.noBidder}>
                            <Typography>No Bid Found!</Typography>
                        </Box>
                    )}
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default BidsViewModal;