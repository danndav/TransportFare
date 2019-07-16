"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _tripValidator = _interopRequireDefault(require("../utilities/tripValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TripCreateSchema = _tripValidator["default"].TripCreateSchema,
    tripUpdateStatusSchema = _tripValidator["default"].tripUpdateStatusSchema;
/**
 *
 * @exports
 * @class TripMiddleware
 */

var TripMiddleware =
/*#__PURE__*/
function () {
  function TripMiddleware() {
    _classCallCheck(this, TripMiddleware);
  }

  _createClass(TripMiddleware, null, [{
    key: "TripCreateValidate",

    /**
     * TripMiddleware
     * @staticmethod  TripValidateData
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    // eslint-disable-next-line consistent-return
    value: function TripCreateValidate(req, res, next) {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'Please fill all fields'
        });
      }

      _joi["default"].validate(req.body, TripCreateSchema).then(function () {
        return next();
      })["catch"](function (err) {
        return res.status(400).json({
          status: 400,
          message: err.details[0].message
        });
      });
    }
    /**
     * TripMiddleware
     * @staticmethod  TripUpdateStatus
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    // eslint-disable-next-line consistent-return

  }, {
    key: "TripUpdateStatus",
    value: function TripUpdateStatus(req, res, next) {
      if (Object.keys(req.body).length === 0) {
        /* istanbul ignore next-line */
        return res.status(400).json({
          status: 400,
          message: 'Please fill all fields'
        });
      }

      _joi["default"].validate(req.body, tripUpdateStatusSchema)
      /* istanbul ignore next-line */
      .then(function () {
        return next();
      })["catch"](function (err) {
        return res.status(400).json({
          status: 400,
          message: err.details[0].message
        });
      });
    }
  }]);

  return TripMiddleware;
}();

var _default = TripMiddleware;
exports["default"] = _default;
//# sourceMappingURL=tripMiddleware.js.map