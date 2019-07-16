"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _moment = _interopRequireDefault(require("moment"));

var _connect = _interopRequireDefault(require("./database/connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var saltRounds = 10;
var obj = {};
var err = {};
/**
 * @exports
 * @class queryProvider
 */

var queryProvider =
/*#__PURE__*/
function () {
  function queryProvider() {
    _classCallCheck(this, queryProvider);
  }

  _createClass(queryProvider, null, [{
    key: "findUserByEmailQuery",

    /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    value: function findUserByEmailQuery(email) {
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM users WHERE email = '".concat(email, "' ");

        _connect["default"].query(query).then(function (result) {
          if (!result.rowCount) {
            err.Message = 'user does not exist';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function (error) {
          err.Message = 'Error Finding User';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find busid by user
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "findBusStatus",
    value: function findBusStatus(busid) {
      console.log('printbus', busid);
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM Trips WHERE busid = ".concat(busid, " And status = 'active'");

        _connect["default"].query(query).then(function (result) {
          console.log('theeee', result);

          if (result.rowCount >= 1) {
            err.Message = 'bus not available';
            err.Status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function (error) {
          console.log('yea error', error);
          err.Message = 'Error Finding busid from trip';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find busid by user
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "findSeatNumberByTripid",
    value: function findSeatNumberByTripid(tripid, seatnumber) {
      console.log('printbuseee', tripid, seatnumber);
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM Bookings WHERE tripid = '".concat(tripid, "' And seatnumber = '").concat(seatnumber, "'");

        _connect["default"].query(query).then(function (result) {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);

          if (result.rowCount >= 1) {
            err.Message = 'seatnumber not available';
            err.Status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function (error) {
          console.log('yea error', error);
          err.Message = 'Error Finding tripid from trip';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find busid by user
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "viewAllTripsbyOriginDestinationQuery",
    value: function viewAllTripsbyOriginDestinationQuery(origin, destination) {
      console.log('originnnnn', destination, origin);
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM Trips WHERE origin = '".concat(origin, "' and destination = '").concat(destination, "' ");

        _connect["default"].query(query).then(function (result) {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);

          if (!result.rowCount) {
            err.Message = 'Trips destination and origin cant be fetched';
            err.status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function (error) {
          console.log('yea error', error);
          err.Message = 'Error Finding origin from trip';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find busid by user
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "findAllTripsbyOriginQuery",
    value: function findAllTripsbyOriginQuery(origin) {
      console.log('printbuseee', origin);
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM Trips WHERE origin = '".concat(origin, "' ");

        _connect["default"].query(query).then(function (result) {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);

          if (!result.rowCount) {
            err.Message = 'Trips origin cant be  fetched';
            err.status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function (error) {
          console.log('yea error', error);
          err.Message = 'Error Finding origin from trip';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find busid by user
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "findAllTripsbyDestinationQuery",
    value: function findAllTripsbyDestinationQuery(destination) {
      console.log(destination);
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM Trips WHERE destination = '".concat(destination, "' ");

        _connect["default"].query(query).then(function (result) {
          console.log('theeee', result);
          console.log('rowww', result.rowCount);

          if (!result.rowCount) {
            err.Message = 'Trips destination cant be fetched';
            err.Status = 400;
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function (error) {
          console.log('yea error', error);
          err.Message = 'Error Finding destination from trip';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find Trip By id
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */

  }, {
    key: "findTripsById",
    value: function findTripsById(id) {
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM Trips WHERE id = '".concat(id, "'");

        _connect["default"].query(query).then(function (result) {
          if (!result.rowCount) {
            err.Message = 'Trip number not found';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function () {
          err.Message = 'Error Finding trip';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find user By id
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */

  }, {
    key: "findUserById",
    value: function findUserById(id) {
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM users WHERE id = '".concat(id, "'");

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            err.Message = 'user Array Empty';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function () {
          err.Message = 'Error Finding user';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find bus by userid
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "findBusByBusid",
    value: function findBusByBusid(busid) {
      return new Promise(function (resolve, reject) {
        console.log('busid', busid);
        var query = "SELECT * FROM Buses WHERE id = ".concat(busid);

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            err.Message = 'bus does not exist';
            reject(err);
          } else {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function (error) {
          console.log(error);
          err.Message = 'Error Finding Bus';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find bus by plate number
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "findBusByplateNumberQuery",
    value: function findBusByplateNumberQuery(plateNumber) {
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM Buses WHERE number_plate = '".concat(plateNumber, "' ");

        _connect["default"].query(query).then(function (result) {
          if (!result.rowCount) {
            err.Message = 'bus does not exist';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function () {
          err.Message = 'Error Finding Bus';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "deleteUserByEmailQuery",
    value: function deleteUserByEmailQuery(email) {
      return new Promise(function (resolve, reject) {
        var query = "DELETE FROM users WHERE email = '".concat(email, "'");

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            var message = 'user does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            var response = 'User Deleted';
            resolve(response);
          }
        })["catch"](function (error) {
          var messager = 'Error Finding User';
          reject(error);
        });
      });
    }
    /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "deleteBusByplateNumber",
    value: function deleteBusByplateNumber(numberPlate) {
      return new Promise(function (resolve, reject) {
        var query = "DELETE FROM Buses WHERE number_plate = '".concat(numberPlate, "'");

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            var message = 'plate number does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            var response = 'bus Deleted';
            resolve(response);
          }
        })["catch"](function (error) {
          var messager = 'Error Finding bus';
          reject(error);
        });
      });
    }
    /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "deleteSeatNumber",
    value: function deleteSeatNumber(seatNumber) {
      return new Promise(function (resolve, reject) {
        var query = "DELETE FROM Bookings WHERE seatnumber= '".concat(seatNumber, "'");

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            var message = 'seatnumber number does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            var response = 'seatnumber Deleted';
            resolve(response);
          }
        })["catch"](function (error) {
          var messager = 'Error Finding seatnumber';
          reject(error);
        });
      });
    }
    /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "deleteTripIdFromBooking",
    value: function deleteTripIdFromBooking(tripid) {
      return new Promise(function (resolve, reject) {
        var query = "DELETE FROM Bookings WHERE tripid = '".concat(tripid, "'");

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            var message = 'tripid number does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            var response = 'tripid Deleted';
            resolve(response);
          }
        })["catch"](function (error) {
          var messager = 'Error Finding tripid';
          reject(error);
        });
      });
    }
    /**
     * Find all Booking
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */

  }, {
    key: "findAllmyBookingQuery",
    value: function findAllmyBookingQuery(users) {
      return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM Bookings WHERE createduser = '".concat(users, "'");

        _connect["default"].query(query).then(function (result) {
          if (!result.rowCount) {
            err.Message = 'Bookings Array Empty';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function () {
          err.Message = 'Error Finding All Trips';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Find all Booking
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */

  }, {
    key: "findAllBookingsQuery",
    value: function findAllBookingsQuery() {
      return new Promise(function (resolve, reject) {
        var query = 'SELECT * FROM Bookings ';

        _connect["default"].query(query).then(function (result) {
          if (!result.rowCount) {
            err.Message = 'Bookings Array Empty';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function () {
          err.Message = 'Error Finding All Trips';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "deleteBookingByid",
    value: function deleteBookingByid(bookingId) {
      return new Promise(function (resolve, reject) {
        var query = "DELETE FROM Bookings WHERE id = '".concat(bookingId, "'");

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            var message = {};
            message.status = 400;
            message.error = 'booking id does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            var response = 'booking Deleted';
            resolve(response);
          }
        })["catch"](function (error) {
          var messager = 'Error Finding Booking Id';
          reject(error);
        });
      });
    }
    /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "UserdeleteBookingByid",
    value: function UserdeleteBookingByid(userId, bookingId) {
      return new Promise(function (resolve, reject) {
        var query = "DELETE FROM Bookings WHERE id = '".concat(bookingId, "' and createduser='").concat(userId, "'");

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            var message = {};
            message.status = 400;
            message.error = 'booking id does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            var response = 'booking Deleted';
            resolve(response);
          }
        })["catch"](function (error) {
          var messager = 'Error Finding Booking Id';
          reject(error);
        });
      });
    }
    /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */

  }, {
    key: "deleteTripByBusid",
    value: function deleteTripByBusid(busid) {
      return new Promise(function (resolve, reject) {
        var query = "DELETE FROM Trips WHERE busid = '".concat(busid, "'");

        _connect["default"].query(query).then(function (result) {
          if (result.rowCount === 0) {
            var message = 'busid does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            var response = 'bus Deleted';
            resolve(response);
          }
        })["catch"](function (error) {
          var messager = 'Error Finding bus';
          reject(error);
        });
      });
    }
    /**
     * save new user
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */

  }, {
    key: "saveUserQuery",
    value: function saveUserQuery(body) {
      var _this = this;

      var email = body.email,
          firstName = body.firstName,
          lastName = body.lastName,
          password = body.password,
          phoneNumber = body.phoneNumber,
          isAdmin = body.isAdmin;
      var today = new Date();
      var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
      var time = "".concat(today.getHours(), ":").concat(today.getMinutes(), ":").concat(today.getSeconds());
      var createdAt = "".concat(date, " ").concat(time);
      return new Promise(function (resolve, reject) {
        _this.findUserByEmailQuery(email).then(function (error) {
          reject(error);
        })["catch"](function () {
          _bcrypt["default"].hash(password, saltRounds).then(function (hash) {
            var queryBody = "\n                              INSERT INTO users(email,firstname, lastname, password, phonenumber, createdon, isadmin)\n                              VALUES ( '".concat(email, "','").concat(firstName, "', '").concat(lastName, "', '").concat(hash, "', '").concat(phoneNumber, "','").concat(createdAt, "', '").concat(isAdmin, "') returning * ");

            _connect["default"].query(queryBody).then(function (result) {
              if (result.rowCount) {
                resolve(result.rows);
              } else if (!result.rowCount) {
                var response = 'Could Not Save User';
                reject(response);
              }
            })["catch"](function (e) {
              reject(e);
            });
          });
        });
      });
    }
    /**
     * Save Account Query
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */

  }, {
    key: "saveBusQuery",
    value: function saveBusQuery(body, userid) {
      var _this2 = this;

      var numberPlate = body.numberPlate,
          manufacturer = body.manufacturer,
          model = body.model,
          year = body.year,
          capacity = body.capacity;
      var today = new Date();
      var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
      var time = "".concat(today.getHours(), ":").concat(today.getMinutes(), ":").concat(today.getSeconds());
      var createdAt = "".concat(date, " ").concat(time);
      return new Promise(function (resolve, reject) {
        _this2.findBusByplateNumberQuery(numberPlate).then(function (error) {
          reject(error);
        })["catch"](function () {
          var queryBody = "\n            INSERT INTO Buses(userid, number_plate, manufacturer, model, year, capacity, createdon)\n  VALUES (".concat(userid, ", '").concat(numberPlate, "', '").concat(manufacturer, "', '").concat(model, "', '").concat(year, "', '").concat(capacity, "', '").concat(createdAt, "') returning * ");

          _connect["default"].query(queryBody).then(function (result) {
            if (result.rowCount >= 1) {
              resolve(result);
            } else if (result.rowCount === 0) {
              var response = 'Could Not Save Buses';
              reject(response);
            }
          })["catch"](function (e) {
            reject(e);
          });
        });
      });
    }
    /**
     * Save Trip Query
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */

  }, {
    key: "saveTripQuery",
    value: function saveTripQuery(body, userid) {
      var _this3 = this;

      var busId = body.busId,
          origin = body.origin,
          destination = body.destination,
          tripDate = body.tripDate,
          fare = body.fare,
          status = body.status;
      var today = new Date();
      var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
      var time = "".concat(today.getHours(), ":").concat(today.getMinutes(), ":").concat(today.getSeconds());
      var createdAt = "".concat(date, " ").concat(time);
      var tripDateformat = (0, _moment["default"])(tripDate).format('DD-MM-YYYY');
      return new Promise(function (resolve, reject) {
        _this3.findBusByBusid(busId).then(function (res) {
          var capacity = res.rows[0].capacity;

          _this3.findBusStatus(busId).then(function () {
            var queryBody = "\n                INSERT INTO Trips(createduser, busid, origin, destination, tripdate, fare, status,capacity, createdon)\n      VALUES ( ".concat(userid, ",'").concat(busId, "','").concat(origin, "', '").concat(destination, "','").concat(tripDateformat, "','").concat(fare, "','").concat(status, "','").concat(capacity, "','").concat(createdAt, "') returning * ");

            _connect["default"].query(queryBody).then(function (result) {
              if (result.rowCount >= 1) {
                resolve(result);
              } else if (result.rowCount === 0) {
                var response = 'Could Not Save Trip';
                reject(response);
              }
            })["catch"](function (e) {
              console.log('firsterror', e);
              reject(e);
            });
          })["catch"](function () {
            var obj1 = {};
            obj1.status = 404;
            obj1.Error = 'This bus id is already assign to a trip';
            reject(obj1);
          });
        })["catch"](function (error) {
          err.status = 400;
          err.Message = 'this bus id does not exist';
          reject(error);
        });
      });
    }
    /**
     * Find all user
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */

  }, {
    key: "findAllTripsQuery",
    value: function findAllTripsQuery() {
      return new Promise(function (resolve, reject) {
        var query = 'SELECT * FROM Trips';

        _connect["default"].query(query).then(function (result) {
          if (!result.rowCount) {
            err.Message = 'Trips Array Empty';
            err.Status = 400;
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function () {
          err.Message = 'Error Finding All Trips';
          err.Status = '02';
          reject(err);
        });
      });
    }
    /**
     * Update Trips Status Query
     * @staticmethod
     * @param  {string} Tripsid - Request object
     * @param  {string} body - Request object
     * @return {string} res
     */

  }, {
    key: "updateTripStatusQuery",
    value: function updateTripStatusQuery(id, body) {
      var status = body.status;
      return new Promise(function (resolve, reject) {
        var queryBody = "UPDATE Trips SET status = '".concat(status, "' WHERE id = '").concat(id, "' returning * ");

        _connect["default"].query(queryBody).then(function (result) {
          if (result.rowCount === 0) {
            var response = 'Trips does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })["catch"](function () {
          var error = 'Error Finding trip';
          reject(error);
        });
      });
    }
    /**
     * Update Trips Status Query
     * @staticmethod
     * @param  {string} Tripsid - Request object
     * @param  {string} body - Request object
     * @return {string} res
     */

  }, {
    key: "updateSeatNumberQuery",
    value: function updateSeatNumberQuery(tripId, body) {
      var _this4 = this;

      var seatNumber = body.seatNumber;
      console.log('bodyyy', body);
      return new Promise(function (resolve, reject) {
        _this4.findTripsById(tripId).then(function (res) {
          var capacity = res.rows[0].capacity;
          console.log('omoo', res.rows[0]);
          console.log('seattttttt', _typeof(seatNumber), _typeof(capacity));

          if (Number(seatNumber) > Number(capacity)) {
            var obj2 = {};
            obj2.status = 400;
            obj2.Message = "this seat number is not available pls select from 1 to ".concat(capacity);
            return reject(obj2);
          }

          _this4.findSeatNumberByTripid(tripId, seatNumber).then(function (respond) {
            console.log('alllll', respond.rows.length);

            if (respond.rows.length > 0) {
              var _obj = {};
              _obj.status = 400;
              _obj.Message = 'this seatNumber has been taken pls choose available seat number';
              reject(_obj);
            }

            console.log('testmeee', seatNumber, tripId);
            var queryBody = "UPDATE Bookings SET seatnumber = '".concat(seatNumber, "' WHERE tripid = '").concat(tripId, "' returning * ");

            _connect["default"].query(queryBody).then(function (result) {
              if (result.rowCount === 0) {
                console.log('identity.', result.rowCount);
                var response = 'Trips does not exist';
                reject(response);
              } else if (result.rowCount >= 1) {
                obj.rowCount = result.rowCount;
                obj.rows = result.rows;
                resolve(obj);
              }
            })["catch"](function (erro) {
              var error = 'Error Finding trip';
              console.log(erro);
              reject(error);
            });
          })["catch"](function (error) {
            console.log(error);
            return reject(err);
          });
        })["catch"](function (error) {
          console.log(error);
          return reject(err);
        });
      });
    }
    /**
     * Save Booking Query
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */

  }, {
    key: "saveBookingQuery",
    value: function saveBookingQuery(body, userid, useremail, userfname, userlname) {
      var _this5 = this;

      var tripId = body.tripId,
          seatNumber = body.seatNumber;
      console.log('tripppiddd', tripId, seatNumber);
      var today = new Date();
      var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
      var time = "".concat(today.getHours(), ":").concat(today.getMinutes(), ":").concat(today.getSeconds());
      var createdAt = "".concat(date, " ").concat(time);
      return new Promise(function (resolve, reject) {
        _this5.findTripsById(tripId).then(function (res) {
          var _res$rows$ = res.rows[0],
              tripdate = _res$rows$.tripdate,
              busid = _res$rows$.busid,
              capacity = _res$rows$.capacity;
          console.log('seattttttt', _typeof(seatNumber), _typeof(capacity));

          if (Number(seatNumber) > Number(capacity)) {
            var obj2 = {};
            obj2.status = 400;
            obj2.Message = "this seat number is not available pls select from 1 to ".concat(capacity);
            return reject(obj2);
          }

          _this5.findSeatNumberByTripid(tripId, seatNumber).then(function (respond) {
            console.log('alllll', respond.rows.length);

            if (respond.rows.length > 0) {
              var _obj2 = {};
              _obj2.status = 400;
              _obj2.Message = 'this seatNumber has been taken pls choose available seat number';
              reject(_obj2);
            }

            var queryBody = "\n                INSERT INTO Bookings(createduser, tripid, busid, tripdate, seatnumber,firstname, lastname, email,createdon)\n      VALUES ( ".concat(userid, ",'").concat(tripId, "','").concat(busid, "', '").concat(tripdate, "','").concat(seatNumber, "','").concat(userfname, "','").concat(userlname, "','").concat(useremail, "','").concat(createdAt, "') returning * ");

            _connect["default"].query(queryBody).then(function (result) {
              if (result.rowCount >= 1) {
                resolve(result);
              } else if (result.rowCount === 0) {
                var response = 'Could Not Save Booking';
                reject(response);
              }
            })["catch"](function (e) {
              console.log('firsterror', e);
              reject(e);
            });
          })["catch"](function (error) {
            console.log(error);
            return reject(err);
          });
        })["catch"](function (error) {
          console.log(error);
          return reject(err);
        });
      });
    }
  }]);

  return queryProvider;
}();

var _default = queryProvider;
exports["default"] = _default;
//# sourceMappingURL=queries.js.map