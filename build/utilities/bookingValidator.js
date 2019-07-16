"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tripId = _joi["default"].number().integer().positive().required();

var seatNumber = _joi["default"].number().integer().positive().required();

var BookingCreateSchema = {
  tripId: tripId,
  seatNumber: seatNumber
};
var BookingUpdateSchema = {
  tripId: tripId,
  seatNumber: seatNumber
};
var _default = {
  BookingCreateSchema: BookingCreateSchema,
  BookingUpdateSchema: BookingUpdateSchema
};
exports["default"] = _default;
//# sourceMappingURL=bookingValidator.js.map