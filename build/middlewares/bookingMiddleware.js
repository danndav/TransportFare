"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bookingValidator = _interopRequireDefault(require("../utilities/bookingValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BookingCreateSchema = _bookingValidator["default"].BookingCreateSchema;
/**
 *
 * @exports
 * @class BookingMiddleware
 */

var BookingMiddleware =
/*#__PURE__*/
function () {
  function BookingMiddleware() {
    _classCallCheck(this, BookingMiddleware);
  }

  _createClass(BookingMiddleware, null, [{
    key: "BookingCreateValidate",

    /**
     * BookingMiddleware
     * @staticmethod  BookingValidateData
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    // eslint-disable-next-line consistent-return
    value: function BookingCreateValidate(req, res, next) {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'Please fill all fields'
        });
      }

      _joi["default"].validate(req.body, BookingCreateSchema).then(function () {
        return next();
      })["catch"](function (err) {
        return res.status(400).json({
          status: 400,
          message: err.details[0].message
        });
      });
    }
  }]);

  return BookingMiddleware;
}();

var _default = BookingMiddleware;
exports["default"] = _default;
//# sourceMappingURL=bookingMiddleware.js.map