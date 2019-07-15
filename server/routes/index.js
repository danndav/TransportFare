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
const { createBooking } = BookingContoller;
const { createTrip, viewAllTrips, updateTripStatus } = TripController;
const { userSignupValidate, userLoginValidate } = UserMiddleware;
const { BusCreateValidate } = BusMiddleware;
const { TripCreateValidate, TripUpdateStatus } = TripMiddleware;
const { BookingCreateValidate } = BookingMiddleware;
const { verifyUser, verifyAdmin } = Authorization;


const router = Router();


// User Routes
router.post('/auth/signup', userSignupValidate, createUser);
router.post('/auth/signin/', userLoginValidate, loginUser);
router.post('/buses', verifyAdmin, BusCreateValidate, createBus);
router.post('/trips', verifyAdmin, TripCreateValidate, createTrip);
router.get('/trips', verifyAdmin, viewAllTrips);
router.patch('/trips/:id', verifyAdmin, TripUpdateStatus, updateTripStatus);
router.post('/bookings', verifyAdmin, BookingCreateValidate, createBooking);

export default router;
