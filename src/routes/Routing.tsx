import React, { Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import TempComponent from './TempComponent';
import AppProvider from '../components/layout/AppProvider';
import AuctionDetailPage from '../components/auction/detail-pages/AuctionDetailPage';
import LiveStreamingDetailPage from '../components/auction/detail-pages/LiveStreamingDetailPage';
import { ToastContainer } from 'react-toastify';
import Inventory from '../components/inventory/Inventory';
import Authentication from '../components/authentication/Authentication';
import CurrentAuctions from '../components/auction/CurrentAuctions';
import AuctionListings from '../components/auction/AuctionListings';

// Page Components
const LandingPage = React.lazy(() => import('../components/landing-page/LandingPage'));
// const Auction = React.lazy(() => import('../components/auction/Auction'));
const LiveStreaming = React.lazy(() => import('../components/live-streaming/LiveStreaming'));
const PaymentTracking = React.lazy(() => import('../components/payment-tracking/PaymentTracking'));
// ProtectedRoute Component
const ProtectedRoute = ({ isAuthenticated, children }: any) => {
    if (!isAuthenticated) {
        return <Navigate to="/signup" />;
    }
    return <AppProvider>{children}</AppProvider>;
};

const Routing = ({ isAuthenticated, setIsAuthenticated }: any) => {

    return (
        <Box style={{ display: 'flex' }}>
            {/* Main Content Area */}
            <Box style={{ flex: 1 }}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>

                        {/* Login Route */}
                        <Route
                            path="/signup"
                            element={isAuthenticated ? <Navigate to="/home" /> : <Authentication setIsAuthenticated={setIsAuthenticated} />}
                        />

                        <Route path="/card-details" element={<Authentication setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/login" element={<Authentication setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/forgot-password" element={<Authentication setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/reset-password" element={<Authentication setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/new-password" element={<Authentication setIsAuthenticated={setIsAuthenticated} />} />

                        {/* Protected Routes */}
                        <Route
                            path="/"
                            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/signup" />}
                        />
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LandingPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/current-auctions"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <CurrentAuctions />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/listings"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AuctionListings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/details"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AuctionDetailPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/live-streaming/details"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LiveStreamingDetailPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/live"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LiveStreaming />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/invoices"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <PaymentTracking />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/inventory"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Inventory />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/logout" element={<TempComponent setIsAuthenticated={setIsAuthenticated} />} />


                        {/* Routes not needed yet: */}
                        {/* <Route
                            path="/auction/create"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <CreatePage type={"auction"} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="auction/lots/create"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AddLot />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/edit"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <CreatePage type={"auction"} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/lots/edit"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AddLot />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/lots"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Lots />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/lots/details"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LotDetailPage />
                                </ProtectedRoute>
                            }
                        /> */}
                    </Routes>
                </Suspense>
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default Routing;
