import { getRequest, putRequest, postWithFormRequest, postRequest } from './index';

// Authentication Methods
export const RegisterUser = (payload: any) => postRequest('/clients/create', payload)
export const emailVerification = (email: any) => postRequest(`/clients/emailverification?email=${email}`);
export const LoginUser = (payload: LogInPayload) => getRequest(`/clients/login?email=${payload.email}&password=${payload?.password}`)
export const forgotPassword = (email: any) => putRequest(`/clients/forgotpassword?email=${email}`)
export const verifyOtp = (payload: any) => postRequest('/clients/verifyotp', payload);
export const updatePassword = (payload: any) => putRequest('/clients/updatepassword', payload);
export const changePassword = (payload: any) => putRequest('/clients/changepassword', payload);

// Landing page APIs
export const getFeaturedAuctionsByLocation = () => getRequest('/auctions/auctionsbylocation')
export const getFeaturedAuctions = () => getRequest('/auctions/featuredauctions')
export const getFeaturedLots = () => getRequest('/lots/featuredlisting')

// Auction Methods
export const getCurrentAuctions = () => getRequest('/auctions/currentauctions');
export const getPastAuctions = () => getRequest('/auctions/pastauctions');
export const getAuctionDetailById = (id: any) => getRequest(`/lots/auctiondetailbyid?id=${id}`);

// Lot Methos
export const getCurrentLots = () => getRequest('/lots/currentlots');
export const getPastLots = () => getRequest('/lots/pastlots');
export const getLotDetailsById = (id: any) => getRequest(`/lots/lotdetails?id=${id}`);
export const getCurrentLotsByLocation = (location: any) => getRequest(`/lots/currentlocationlots?location=${location}`);
export const getPastLotsByLocation = (location: any) => getRequest(`/lots/pastlocationlots?location=${location}`);

// WatchList Methods
export const addToWatchlist = (id: any, lotId: any) => getRequest(`/wishlist/addtowishlist?clientid=${id}&lotid=${lotId}`);
export const getWatchlist = (id: any) => getRequest(`/wishlist/getwishlist?clientid=${id}`);

// Bidding Methods
export const getBidHistory = (id: any, isWinner: any) => getRequest(`lots/clientbids?id=${id}&iswinner=${isWinner}`);
export const placeBid = (payload: any) => postWithFormRequest('/lots/newbid', payload);


// Payment Tracking Methods
export const getPaidInvoices = (id: any) => getRequest(`/invoices/clientpaidinvoice?id=${id}`);
export const getUnpaidInvoices = (id: any) => getRequest(`/invoices/clientpendinginvoice?id=${id}`);

// Location Methods
export const getCurrentLocations = () => getRequest('/auctions/currentlocations');
export const getPastLocations = () => getRequest('/auctions/pastlocations');
export const getCurrentAuctionsByLocation = (location: any) => getRequest(`/auctions/currentlocationauctions?loc=${location}`);
export const getPastAuctionsByLocation = (location: any) => getRequest(`/auctions/pastlocationauctions?loc=${location}`);

export const getAllStates = () => getRequest('auctions/getstate');
export const getCityByState = (state: any) => getRequest(`/auctions/getcitiesbystate?state=${state}`);
export const getAddressByCity = (city: any) => getRequest(`/auctions/getaddressbycity?city=${city}`);

// Live Streaming Methods
export const getCurrentLiveAuctions = () => getRequest('/auctions/currentliveauctions');

// Stripe Methods
export const createPaymentIntent = () => getRequest('/create-payment-intent');
