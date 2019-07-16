"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tripServices = _interopRequireDefault(require("../utilities/services/tripServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class TripController
 */
var TripController =
/*#__PURE__*/
function () {
  function TripController() {
    _classCallCheck(this, TripController);
  }

  _createClass(TripController, null, [{
    key: "createTrip",

    /**
       * Creates a new Trip
       * @staticmethod
       * @param  {object} req - Trip object
       * @param {object} res - Response object
       * @return {json} res.json
       */
    value: function createTrip(req, res) {
      var userId = req.userData.id;

      _tripServices["default"].saveTrip(req.body, userId).then(function (data) {
        return res.status(201).json({
          status: 201,
          data: data,
          message: 'New Trip created successfully'
        });
      })["catch"](function (err) {
        return res.status(400).json(err);
      });
    }
    /**
     * View all Trips
     * @staticmethod
     * @param  {object} req - Trip objectexport default TripController
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "viewAllTrips",
    value: function viewAllTrips(req, res) {
      _tripServices["default"].viewAllCreatedTrips().then(function (response) {
        return res.status(200).json({
          status: 200,
          message: 'Successfully fetched all Trips',
          data: response.rows
        });
      })
      /* istanbul ignore next-line */
      ["catch"](function (err) {
        return res.status(400).json(err);
      });
    }
    /**
       * Update Trip Destination
       * @staticmethod
       * @param  {object} req - Trip object
       * @param {object} res - Response object
       * @return {json} res.json
       */

  }, {
    key: "updateTripStatus",
    value: function updateTripStatus(req, res) {
      var id = req.params.id;
      var status = req.body;

      _tripServices["default"].updateStatus(id, status).then(function (response) {
        return res.status(200).json({
          status: 200,
          message: 'Trip Status Updated Successfully',
          data: response
        });
      }) // eslint-disable-next-line no-unused-vars
      ["catch"](function (err) {
        return res.status(404).json({
          status: 404,
          error: 'This Trip does not exist'
        });
      });
    }
    /**
     * View all Trips  by origin
     * @staticmethod
     * @param  {object} req - Trip objectexport default TripController
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "viewAllTripsbyOriginorDestination",
    value: function viewAllTripsbyOriginorDestination(req, res) {
      var _req$query = req.query,
          origin = _req$query.origin,
          destination = _req$query.destination;

      if (origin && destination) {
        _tripServices["default"].viewAllTripsbyOriginDestination(origin, destination).then(function (response) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully fetched all Trips by Origin and Destination',
            data: response.rows
          });
        })["catch"](function (err) {
          return res.status(400).json(err);
        });
      } else if (origin) {
        _tripServices["default"].viewAllTripsOrigin(origin).then(function (response) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully fetched all Trips by origin',
            data: response.rows
          });
        })["catch"](function (err) {
          return res.status(400).json(err);
        });
      } else if (destination) {
        _tripServices["default"].viewAllTripsDestination(destination).then(function (response) {
          return res.status(200).json({
            status: 200,
            message: 'Successfully fetched all Trips by Destination',
            data: response.rows
          });
        })["catch"](function (err) {
          return res.status(400).json(err);
        });
      } else {
        /* istanbul ignore next-line */
        return res.status(400).json({
          status: 400,
          message: 'Could not fetch any trips'
        });
      }
    }
  }]);

  return TripController;
}();

var _default = TripController;
exports["default"] = _default;
//# sourceMappingURL=tripController.js.map