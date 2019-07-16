import { Router } from 'express';
import UserController from '../controllers/userController';
import BusController from '../controllers/busController';
import TripController from '../controllers/tripController';
import BookingContoller from '../controllers/bookingContoller';
import UserMiddleware from '../middlewares/userMiddleware';
import BusMiddleware from '../middlewares/busMiddleware';
import TripMiddleware from '../middlewares/tripMiddleware';
import BookingMiddleware from '../middlewares/bookingMiddleware';
import Authorization from '../middlewares/authentication';


const { createUser, loginUser } = UserController;
const { createBus } = BusController;
const {
  createBooking, viewAllBookings, DeleteUserBooking, updateBookingSeatNumber,
} = BookingContoller;
const {
  createTrip, viewAllTrips, updateTripStatus, viewAllTripsbyOriginorDestination,
} = TripController;
const { userSignupValidate, userLoginValidate } = UserMiddleware;
const { BusCreateValidate } = BusMiddleware;
const { TripCreateValidate, TripUpdateStatus } = TripMiddleware;
const { BookingCreateValidate } = BookingMiddleware;
const { verifyUser, verifyAdmin } = Authorization;


const router = Router();


// User Routes
router.post('/auth/signup', userSignupValidate, createUser);
router.post('/auth/signin/', userLoginValidate, loginUser);

// Buses Routes
router.post('/buses', verifyAdmin, BusCreateValidate, createBus);
router.get('/trips/search', verifyAdmin && verifyUser, viewAllTripsbyOriginorDestination);
router.post('/trips', verifyAdmin, TripCreateValidate, createTrip);
router.get('/trips', verifyAdmin && verifyUser, viewAllTrips);
router.patch('/trips/:id', verifyAdmin, TripUpdateStatus, updateTripStatus);

// Booking Routes
router.post('/bookings', verifyAdmin && verifyUser, BookingCreateValidate, createBooking);
router.get('/bookings', verifyAdmin && verifyUser, viewAllBookings);
router.delete('/bookings/:id', verifyAdmin && verifyUser, DeleteUserBooking);
router.patch('/bookings/:tripId', verifyAdmin && verifyUser, updateBookingSeatNumber);


export default router;
