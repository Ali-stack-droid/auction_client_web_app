import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Pagination, Stack, Button, ToggleButton, ToggleButtonGroup, Fade, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import usePaymentTrackingStyles from "./InvoicesStyles";
import { getPaidInvoices, getPendingInvoices } from "../Services/Methods";
import NoRecordFound from "../../utils/NoRecordFound";
import PaymentViewModal from "./PaymentViewModal";
import { tableData } from "./paymentData";

const Invoices = () => {
    const classes = usePaymentTrackingStyles();

    const [invoices, setInvoices]: any = useState(tableData);
    const [isFetchingData, setIsFetchingData] = useState(false);

    const [page, setPage] = useState<number>(0);
    const [selectedInvoice, setSelectedInvoice] = useState({});
    const [paidInvoice, setPaidInvoice] = useState<boolean>(true);
    const [viewDetails, setViewDetails] = useState(false);
    const rowsPerPage = 10;

    // useEffect(() => {
    //     fetchInvoices();
    // }, [paidInvoice])

    // const fetchInvoices = async () => {
    //     setIsFetchingData(true)
    //     try {
    //         const response = paidInvoice
    //             ? await getPaidInvoices()
    //             : await getPendingInvoices();

    //         if (response.data && response.data.length > 0) {
    //             const formattedInvoices = response.data.map((invoice: any) => ({
    //                 invoiceId: invoice.Id,
    //                 name: invoice.Name,
    //                 email: invoice.Email,
    //                 amount: invoice.TotalAmount,
    //                 deadline: invoice.Date,
    //                 status: invoice.Status,
    //                 totalLots: invoice.TotalLots,
    //                 paidAmount: invoice.PaidAmount,
    //                 pendingAmount: invoice.Pending,
    //                 paymentMethod: invoice.PaymenMethod,
    //             }));
    //             setInvoices(formattedInvoices);
    //         } else {
    //             setInvoices([]);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching auction data:', error);
    //     } finally {
    //         setIsFetchingData(false)
    //     }
    // };

    const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1); // Adjust for 0-based index
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPage(0);
    };

    const handleToggleInvoice = () => {
        if (!isFetchingData) {
            setPage(0);
            setPaidInvoice(!paidInvoice);
        }
    }
    const handleViewButton = (ind: number) => {
        setSelectedInvoice(invoices[ind]);
        setViewDetails(true)
    }
    // Calculate the number of pages based on the length of tableData
    const totalPages = Math.ceil(invoices.length / rowsPerPage);

    return (
        <Box >
            <Box className={classes.header}>
                <Typography className={classes.title}>{paidInvoice ? "Paid Invoices" : "Unpaid Invoices"}</Typography>
                <Box className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={paidInvoice ? 'paid' : 'unpaid'}
                        exclusive
                        onChange={handleToggleInvoice}
                        sx={{ maxHeight: '30px' }}
                    >
                        <ToggleButton
                            value="paid"
                            className={`${classes.toggleButton} ${paidInvoice ? 'paid' : 'unpaid'}`}
                        >
                            Paid Invoices
                        </ToggleButton>
                        <ToggleButton
                            value="unpaid"
                            className={`${classes.toggleButton} ${!paidInvoice ? 'paid' : 'unpaid'}`}
                        >
                            Unpaid Invoices
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            {!isFetchingData && invoices.length > 0 ?
                <Box>
                    <Table className={classes.paymentTable} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#19549F' }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Item Description</TableCell>
                                <TableCell sx={{ color: "white" }}>Date Purchase</TableCell>
                                <TableCell sx={{ color: "white" }}>Payment Due Date</TableCell>
                                <TableCell sx={{ color: "white" }}>Pickup Status</TableCell>
                                <TableCell sx={{ color: "white" }}>{paidInvoice ? "Details" : "Status"}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                                <TableRow key={row.name + index}>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.datePurchase}</TableCell>
                                    <TableCell>{row.paymentDueDate}</TableCell>
                                    <TableCell>
                                        {paidInvoice ?
                                            <Button variant={'contained'} className={classes.viewButton} onClick={() => handleViewButton(index)}>{row.pickupStatus ? "Picked" : "Not Picked"}</Button>
                                            :
                                            <Button variant={'contained'} className={classes.viewButton} onClick={() => handleViewButton(index)}>View</Button>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {paidInvoice ?
                                            <Button variant={'contained'} className={classes.downloadButton} onClick={() => handleViewButton(index)}>Download</Button>
                                            :
                                            <Button variant={'contained'} className={classes.downloadButton} onClick={() => handleViewButton(index)}>Pay Now</Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box className={classes.paginationWrapper}>
                        <Stack spacing={0}>
                            <Pagination
                                count={totalPages} // Set the total pages dynamically
                                page={page + 1} // Adjust for 1-based index
                                onChange={handleChangePage}
                                variant="outlined"
                                shape="rounded"
                            />
                        </Stack>
                    </Box>
                </Box>
                : isFetchingData ?
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '70vh',
                            width: '100%',
                        }}
                    >
                        <CircularProgress size={70} disableShrink />
                    </Box>
                    :
                    <Box sx={{ maxHeight: "65vh" }}>
                        <NoRecordFound />
                    </Box>
            }

            <PaymentViewModal open={viewDetails} onClose={() => setViewDetails(false)} invoice={selectedInvoice} />
        </Box >
    );
};

export default Invoices;
