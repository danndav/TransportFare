"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bookingServices = _interopRequireDefault(require("../utilities/services/bookingServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class BookingController
 */
var BookingController =
/*#__PURE__*/
function () {
  function BookingController() {
    _classCallCheck(this, BookingController);
  }

  _createClass(BookingController, null, [{
    key: "createBooking",

    /**
       * Creates a new Booking
       * @staticmethod
       * @param  {object} req - user object
       * @param {object} res - Response object
       * @return {json} res.json
       */
    value: function createBooking(req, res) {
      var userId = req.userData.id;

      _bookingServices["default"].saveBooking(req.body, userId).then(function (data) {
        return res.status(201).json({
          status: 201,
          data: data,
          message: 'New Booking created successfully'
        });
      })["catch"](function (err) {
        return res.status(400).json(err);
      });
    }
    /**
     * View all Bookings
     * @staticmethod
     * @param  {object} req - Booking object export default BookingController
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "viewAllBookings",
    value: function viewAllBookings(req, res) {
      var userId = req.userData.id;
      var typeofUser = req.userData.isAdmin;

      _bookingServices["default"].viewAllCreatedBookings(typeofUser, userId).then(function (response) {
        return res.status(200).json({
          status: 200,
          message: 'Successfully fetched all Bookings',
          data: response.rows
        });
      })["catch"](function (err) {
        return res.status(400).json(err);
      });
    }
    /**
     * View all Bookings
     * @staticmethod
     * @param  {object} req - Booking object export default BookingController
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "DeleteUserBooking",
    value: function DeleteUserBooking(req, res) {
      var userId = req.userData.id;
      var typeofUser = req.userData.isAdmin;
      var bookingId = req.params.id;

      _bookingServices["default"].DeleteBooking(typeofUser, userId, bookingId).then(function (response) {
        return res.status(200).json({
          status: 200,
          message: 'Successfully Deleted Booking',
          data: response.rows
        });
      })["catch"](function (err) {
        return res.status(400).json(err);
      });
    }
    /**
       * Update Booking Destination
       * @staticmethod
       * @param  {object} req - Booking object
       * @param {object} res - Response object
       * @return {json} res.json
       */

  }, {
    key: "updateBookingSeatNumber",
    value: function updateBookingSeatNumber(req, res) {
      var tripId = req.params.tripId;
      var seatnumber = req.body;

      _bookingServices["default"].bookingupdateseatNumber(tripId, seatnumber).then(function (response) {
        return res.status(200).json({
          status: 200,
          message: 'Booking SeatNumber Updated Successfully',
          data: response
        });
      }) // eslint-disable-next-line no-unused-vars
      ["catch"](function (err) {
        return res.status(404).json({
          status: 404,
          error: 'This Booking does not exist'
        });
      });
    }
  }]);

  return BookingController;
}();

var _default = BookingController;
exports["default"] = _default;
//# sourceMappingURL=bookingContoller.js.map