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

/** export default TripService;
 * @exports
 * @class TripServices
 */
var TripServices =
/*#__PURE__*/
function () {
  function TripServices() {
    _classCallCheck(this, TripServices);
  }

  _createClass(TripServices, null, [{
    key: "saveTrip",

    /**
       * save new Trip
       * @staticmethod
       * @param  {string} body - Request object
       * @param  {string} Tripid - Request object
       * @return {string} res
       *
       */
    value: function saveTrip(body, userid) {
      return new Promise(function (resolve, reject) {
        _queries["default"].saveTripQuery(body, userid).then(function (res) {
          var data = {
            id: res.rows[0].id,
            createduser: res.rows[0].createduser,
            busId: res.rows[0].busid,
            origin: res.rows[0].origin,
            destination: res.rows[0].destination,
            tripDate: res.rows[0].tripdate,
            fare: res.rows[0].fare,
            status: res.rows[0].status
          };
          resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
    /**
    * view all Trips created
    * @staticmethod
    * @return {string} res
    */

  }, {
    key: "viewAllCreatedTrips",
    value: function viewAllCreatedTrips() {
      return new Promise(function (resolve, reject) {
        _queries["default"].findAllTripsQuery().then(function (response) {
          return resolve(response);
        })
        /* istanbul ignore next-line */
        ["catch"](function (err) {
          return reject(err);
        });
      });
    }
    /**
     * update Trip status
     * @staticmethod
     * @param  {string} TripId - Request object
     * @param  {string} body - Request object
     * @param  {string} host - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */

  }, {
    key: "updateStatus",
    value: function updateStatus(id, body) {
      return new Promise(function (resolve, reject) {
        _queries["default"].updateTripStatusQuery(id, body).then(function (res) {
          console.log(res.rows);
          var data = {
            id: res.rows[0].id,
            status: res.rows[0].status
          };
          resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
    /**
    * view all Trips by origin
    * @staticmethod
    * @return {string} res
    */

  }, {
    key: "viewAllTripsbyOriginDestination",
    value: function viewAllTripsbyOriginDestination(origin, destination) {
      return new Promise(function (resolve, reject) {
        _queries["default"].viewAllTripsbyOriginDestinationQuery(origin, destination).then(function (response) {
          return resolve(response);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
    /**
    * view all Trips by origin
    * @staticmethod
    * @return {string} res
    */

  }, {
    key: "viewAllTripsOrigin",
    value: function viewAllTripsOrigin(origin) {
      return new Promise(function (resolve, reject) {
        _queries["default"].findAllTripsbyOriginQuery(origin).then(function (response) {
          return resolve(response);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
    /**
    * view all Trips by destination
    * @staticmethod
    * @return {string} res
    */

  }, {
    key: "viewAllTripsDestination",
    value: function viewAllTripsDestination(destination) {
      return new Promise(function (resolve, reject) {
        _queries["default"].findAllTripsbyDestinationQuery(destination).then(function (response) {
          return resolve(response);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }]);

  return TripServices;
}();

var _default = TripServices;
exports["default"] = _default;
//# sourceMappingURL=tripServices.js.map