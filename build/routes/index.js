"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _busController = _interopRequireDefault(require("../controllers/busController"));

var _tripController = _interopRequireDefault(require("../controllers/tripController"));

var _bookingContoller = _interopRequireDefault(require("../controllers/bookingContoller"));

var _userMiddleware = _interopRequireDefault(require("../middlewares/userMiddleware"));

var _busMiddleware = _interopRequireDefault(require("../middlewares/busMiddleware"));

var _tripMiddleware = _interopRequireDefault(require("../middlewares/tripMiddleware"));

var _bookingMiddleware = _interopRequireDefault(require("../middlewares/bookingMiddleware"));

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUser = _userController["default"].createUser,
    loginUser = _userController["default"].loginUser;
var createBus = _busController["default"].createBus;
var createBooking = _bookingContoller["default"].createBooking,
    viewAllBookings = _bookingContoller["default"].viewAllBookings,
    DeleteUserBooking = _bookingContoller["default"].DeleteUserBooking,
    updateBookingSeatNumber = _bookingContoller["default"].updateBookingSeatNumber;
var createTrip = _tripController["default"].createTrip,
    viewAllTrips = _tripController["default"].viewAllTrips,
    updateTripStatus = _tripController["default"].updateTripStatus,
    viewAllTripsbyOriginorDestination = _tripController["default"].viewAllTripsbyOriginorDestination;
var userSignupValidate = _userMiddleware["default"].userSignupValidate,
    userLoginValidate = _userMiddleware["default"].userLoginValidate;
var BusCreateValidate = _busMiddleware["default"].BusCreateValidate;
var TripCreateValidate = _tripMiddleware["default"].TripCreateValidate,
    TripUpdateStatus = _tripMiddleware["default"].TripUpdateStatus;
var BookingCreateValidate = _bookingMiddleware["default"].BookingCreateValidate;
var verifyUser = _authentication["default"].verifyUser,
    verifyAdmin = _authentication["default"].verifyAdmin;
var router = (0, _express.Router)(); // User Routes

router.post('/auth/signup', userSignupValidate, createUser);
router.post('/auth/signin/', userLoginValidate, loginUser); // Buses Routes

router.post('/buses', verifyAdmin, BusCreateValidate, createBus);
router.get('/trips/search', verifyAdmin && verifyUser, viewAllTripsbyOriginorDestination);
router.post('/trips', verifyAdmin, TripCreateValidate, createTrip);
router.get('/trips', verifyAdmin && verifyUser, viewAllTrips);
router.patch('/trips/:id', verifyAdmin, TripUpdateStatus, updateTripStatus); // Booking Routes

router.post('/bookings', verifyAdmin && verifyUser, BookingCreateValidate, createBooking);
router.get('/bookings', verifyAdmin && verifyUser, viewAllBookings);
router["delete"]('/bookings/:id', verifyAdmin && verifyUser, DeleteUserBooking);
router.patch('/bookings/:tripId', verifyAdmin && verifyUser, updateBookingSeatNumber);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map