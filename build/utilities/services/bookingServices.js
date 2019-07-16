"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _queries = _interopRequireDefault(require("../queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** export default BookingService;
 * @exports
 * @class BookingService
 */
var BookingService =
/*#__PURE__*/
function () {
  function BookingService() {
    _classCallCheck(this, BookingService);
  }

  _createClass(BookingService, null, [{
    key: "saveBooking",

    /**
       * save new Booking
       * @staticmethod
       * @param  {string} body - Request object
       * @param  {string} userid - Request object
       * @return {string} res findUserById
       */
    value: function saveBooking(body, userid) {
      return new Promise(function (resolve, reject) {
        _queries["default"].findUserById(userid).then(function (res) {
          var _res$rows$ = res.rows[0],
              firstname = _res$rows$.firstname,
              lastname = _res$rows$.lastname,
              email = _res$rows$.email;
          console.log('bodyyyy', body, userid);
          console.log(res.rows[0]);

          _queries["default"].saveBookingQuery(body, userid, firstname, lastname, email).then(function (respond) {
            var data = {
              bookingId: respond.rows[0].id,
              userId: respond.rows[0].createduser,
              TripId: respond.rows[0].tripid,
              busId: respond.rows[0].busid,
              tripDate: respond.rows[0].tripdate,
              seatNumber: respond.rows[0].seatnumber,
              firstName: respond.rows[0].firstname,
              lastName: respond.rows[0].setnumber,
              email: respond.rows[0].email,
              createdOn: respond.rows[0].createdon
            };
            console.log(data);
            console.log('hello there', res);
            resolve(data);
          })["catch"](function (err) {
            console.log('hello there', err);
            return reject(err);
          });
        })["catch"](function (err) {
          console.log('hello there', err);
          return reject(err);
        });
      });
    }
    /**
     * view all Booking created
     * @staticmethod
     * @return {string} res
     */

  }, {
    key: "viewAllCreatedBookings",
    value: function viewAllCreatedBookings(typeofUser, userId) {
      return new Promise(function (resolve, reject) {
        if (typeofUser === true) {
          _queries["default"].findAllBookingsQuery().then(function (response) {
            return resolve(response);
          })["catch"](function (err) {
            return reject(err);
          });
        } else {
          _queries["default"].findAllmyBookingQuery(userId).then(function (response) {
            return resolve(response);
          })["catch"](function (err) {
            return reject(err);
          });
        }
      });
    }
    /**
     *Delete Booking created
     * @staticmethod
     * @return {string} res
     */

  }, {
    key: "DeleteBooking",
    value: function DeleteBooking(typeofUser, userId, bookingId) {
      return new Promise(function (resolve, reject) {
        if (typeofUser === true) {
          _queries["default"].deleteBookingByid(bookingId).then(function (response) {
            return resolve(response);
          })["catch"](function (err) {
            return reject(err);
          });
        } else {
          _queries["default"].UserdeleteBookingByid(userId, bookingId).then(function (response) {
            return resolve(response);
          })["catch"](function (err) {
            return reject(err);
          });
        }
      });
    }
    /**
       * update Booking seatnumber status
       * @staticmethod
       * @param  {string} BookingId - Request object
       * @param  {string} body - Request object
       * @param  {string} host - Request object
       * @param  {string} user_id - Request object
       * @return {string} res
       */

  }, {
    key: "bookingupdateseatNumber",
    value: function bookingupdateseatNumber(id, body) {
      return new Promise(function (resolve, reject) {
        _queries["default"].updateSeatNumberQuery(id, body).then(function (res) {
          console.log(res.rows);
          var data = {
            id: res.rows[0].id,
            seatNumber: res.rows[0].seatnumber
          };
          resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }]);

  return BookingService;
}();

var _default = BookingService;
exports["default"] = _default;
//# sourceMappingURL=bookingServices.js.map