"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _busServices = _interopRequireDefault(require("../utilities/services/busServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class BusController
 */
var BusController =
/*#__PURE__*/
function () {
  function BusController() {
    _classCallCheck(this, BusController);
  }

  _createClass(BusController, null, [{
    key: "createBus",

    /**
       * Creates a Bus
       * @staticmethod
       * @param  {object} req - user object
       * @param {object} res - Response object
       * @return {json} res.json
       */
    value: function createBus(req, res) {
      var userId = req.userData.id;

      _busServices["default"].saveBus(req.body, userId).then(function (data) {
        return res.status(201).json({
          status: 201,
          data: data,
          message: 'New Bus created successfully'
        });
      })["catch"](function (err) {
        /* istanbul ignore next-line */
        if (err.rowCount >= 1) {
          return res.status(400).json({
            status: 400,
            message: 'Bus with this platenumber exists already'
          });
        }
        /* istanbul ignore next-line */


        return res.status(400).json({
          message: 'Could not create buses'
        });
      });
    }
  }]);

  return BusController;
}();

var _default = BusController;
exports["default"] = _default;
//# sourceMappingURL=busController.js.map