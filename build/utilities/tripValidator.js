"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var origin = _joi["default"].string().trim().min(1).required();

var destination = _joi["default"].string().trim().min(1).required();

var status = _joi["default"].string().trim().min(1).valid('active', 'cancelled').required();

var fare = _joi["default"].number().integer().positive().required();

var busId = _joi["default"].number().integer().positive().required();

var tripDate = _joi["default"].date().required();

var TripCreateSchema = {
  origin: origin,
  destination: destination,
  status: status,
  fare: fare,
  busId: busId,
  tripDate: tripDate
};
var tripUpdateStatusSchema = {
  status: status
};
var _default = {
  TripCreateSchema: TripCreateSchema,
  tripUpdateStatusSchema: tripUpdateStatusSchema
};
exports["default"] = _default;
//# sourceMappingURL=tripValidator.js.map