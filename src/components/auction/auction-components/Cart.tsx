import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    Modal,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Paper

} from "@mui/material";
import { Formik, Field, useFormik } from "formik";
import * as Yup from "yup";
import CartStyles from './CartStyles';
import CustomTextField from '../../custom-components/CustomTextField';
import { CustomMultiLineTextField } from '../../custom-components/CustomMultiLineTextField';
import Stripe from 'stripe';


const Cart = () => {

    const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY as string);
    const classes = CartStyles();

    // Import required modules

    const [submissionAttempt, setSubmissionAttempt] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);


    const stripeFunction = async () => {
        // const customer = await stripe.customers.create({
        //     email: 'customer@example.com',
        // });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });

        console.log(paymentIntent);
    }

    return (
        <Box pb={'80px'}>
            <Typography className={classes.pageHeading}>
                Shipping Address and Payment Address:
            </Typography>

            <Box className={classes.container}>

                <Formik
                    initialValues={{
                        email: "",
                        country: "",
                        firstName: "",
                        lastName: "",
                        address: "",
                        phoneNumber: "",
                        specialInstruction: "",
                        apartment: "",
                        zipCode: "",
                        postalCode: "",
                        payment: "",
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().email("Invalid email").required("Email is required"),
                        country: Yup.string().required("Country is required"),
                        firstName: Yup.string().required("First name is required"),
                        lastName: Yup.string().required("Last name is required"),
                        address: Yup.string().required("Address is required"),
                        phoneNumber: Yup.string()
                            .matches(/^\d+$/, "Must be a number")
                            .required("Phone number is required"),
                        zipCode: Yup.string().required("Zip Code is required"),
                    })}
                    onSubmit={(values: any) => {
                        alert(JSON.stringify(values));
                        // formik.resetForm();
                    }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container>
                                <Typography className={classes.heading}>
                                    Contact:
                                </Typography>
                                {/* Email */}
                                <Grid className={
                                    (formik.touched.email) && formik.errors.email
                                        ? classes.error
                                        : classes.gridStyle
                                } item xs={12}>
                                    <Typography className={classes.label}>
                                        Email
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        name="email"
                                        placeholder="Email"
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && typeof formik.errors.email === 'string' ? formik.errors.email : ''}
                                    />
                                </Grid>


                                <Typography className={classes.heading}>
                                    Delivery:
                                </Typography>
                                {/* Country */}
                                <Grid className={
                                    (formik.touched.country) && formik.errors.country
                                        ? classes.error
                                        : classes.gridStyle
                                } item xs={12}>
                                    <Typography className={classes.label}>
                                        Country / Region
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        name="country"
                                        placeholder="Country / Region"
                                        error={formik.touched.country && Boolean(formik.errors.country)}
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.country && typeof formik.errors.country === 'string' ? formik.errors.country : ''}
                                    />
                                </Grid>

                                {/* First Name */}
                                <Grid className={
                                    (formik.touched.firstName) && formik.errors.firstName
                                        ? classes.error
                                        : classes.gridStyle
                                } item xs={12}>
                                    <Typography className={classes.label}>
                                        First Name
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        name="firstName"
                                        placeholder="First Name"
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && typeof formik.errors.firstName === 'string' ? formik.errors.firstName : ''}
                                    />
                                </Grid>

                                {/* Last Name */}
                                <Grid className={
                                    (formik.touched.lastName) && formik.errors.lastName
                                        ? classes.error
                                        : classes.gridStyle
                                } item xs={12}>
                                    <Typography className={classes.label}>
                                        Last Name
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        name="lastName"
                                        placeholder="Last Name"
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && typeof formik.errors.lastName === 'string' ? formik.errors.lastName : ''}
                                    />
                                </Grid>

                                {/* Address */}
                                <Grid className={
                                    (formik.touched.address) && formik.errors.address
                                        ? classes.error
                                        : classes.gridStyle
                                } item xs={12}>
                                    <Typography className={classes.label}>
                                        Address
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        name="address"
                                        placeholder="Address"
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && typeof formik.errors.address === 'string' ? formik.errors.address : ''}
                                    />
                                </Grid>

                                {/* Phone Number */}
                                <Grid className={
                                    (formik.touched.phoneNumber) && formik.errors.phoneNumber
                                        ? classes.error
                                        : classes.gridStyle
                                } item xs={12}>
                                    <Typography className={classes.label}>
                                        Phone Number
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && typeof formik.errors.phoneNumber === 'string' ? formik.errors.phoneNumber : ''}
                                    />
                                </Grid>

                                {/* Special Instruction */}
                                <Grid className={classes.gridStyle} item xs={12}>
                                    <Typography className={classes.label}>
                                        Special Instruction
                                    </Typography>
                                    <CustomMultiLineTextField
                                        name="instruction"
                                        placeholder="Special Instruction"
                                        maxRows={6}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                {/* Apartment */}
                                <Grid className={classes.gridStyle} item xs={12}>
                                    <Typography className={classes.label}>
                                        Apartment
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        name="apartment"
                                        placeholder="Apartment (Optional)"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                {/* Zip Code */}
                                <Grid className={
                                    (formik.touched.zipCode) && formik.errors.zipCode
                                        ? classes.error
                                        : classes.gridStyle
                                } item xs={12}>
                                    <Typography className={classes.label}>
                                        Zip Code
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        name="zipCode"
                                        placeholder="Zip Code"
                                        onChange={formik.handleChange}
                                        error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                                        helperText={formik.touched.zipCode && typeof formik.errors.zipCode === 'string' ? formik.errors.zipCode : ''}
                                    />
                                </Grid>

                                {/* Postal Code */}
                                <Grid className={classes.gridStyle} item xs={12}>
                                    <Typography className={classes.label}>
                                        Postal Code
                                    </Typography>
                                    <CustomTextField
                                        fullWidth
                                        onChange={formik.handleChange}
                                        name="postalCode"
                                        placeholder="Postal Code (Optional)"
                                    />
                                </Grid>

                                {/* Payment Method */}
                                <Grid mb={'40px'} className={classes.gridStyle} item xs={12}>
                                    <Typography className={classes.payment}> <span style={{ fontSize: '22px', fontWeight: 500, color: '#012868' }}>Payment</span>  (All payments are secured and encrypted):</Typography>
                                    <Paper className={classes.paper}>
                                        <Field as={RadioGroup} name="payment">
                                            <FormControlLabel
                                                value="debit"
                                                control={<Radio />}
                                                label="Debit - Credit Card"
                                            />
                                        </Field>
                                    </Paper>
                                </Grid>

                                {/* Submit Button */}
                                <Grid className={classes.gridStyle} item xs={12}>
                                    <Button
                                        onClick={() => setSubmissionAttempt(!submissionAttempt)}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className={classes.submitButton}                                    >
                                        Complete Auction Process
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
                {/* Modal */}
                <Modal open={open} onClose={handleClose}>
                    <Box
                        className={classes.modalStyles}
                    >
                        <Typography variant="h6" gutterBottom>
                            Congratulations!
                        </Typography>
                        <Typography gutterBottom>
                            Your Auction Process is Successfully Completed!
                        </Typography>
                        <Button onClick={handleClose} variant="contained" color="primary">
                            Close
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </Box >
    );
};

export default Cart;
