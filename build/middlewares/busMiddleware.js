"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _busValidator = _interopRequireDefault(require("../utilities/busValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BusCreateSchema = _busValidator["default"].BusCreateSchema;
/**
 *
 * @exports
 * @class UserMiddleware
 */

var BusMiddleware =
/*#__PURE__*/
function () {
  function BusMiddleware() {
    _classCallCheck(this, BusMiddleware);
  }

  _createClass(BusMiddleware, null, [{
    key: "BusCreateValidate",

    /**
     * UserMiddleware
     * @staticmethod  userValidateData
     * @param  {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - middleware next (for error handling)
     * @return {json} res.json
     */
    // eslint-disable-next-line consistent-return
    value: function BusCreateValidate(req, res, next) {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'Please fill all fields'
        });
      }

      _joi["default"].validate(req.body, BusCreateSchema).then(function () {
        return next();
      })["catch"](function (err) {
        return res.status(400).json({
          status: 400,
          message: err.details[0].message
        });
      });
    }
  }]);

  return BusMiddleware;
}();

var _default = BusMiddleware;
exports["default"] = _default;
//# sourceMappingURL=busMiddleware.js.map