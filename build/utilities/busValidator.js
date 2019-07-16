"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var numberPlate = _joi["default"].string().alphanum().trim().min(7).required();

var manufacturer = _joi["default"].string().trim().min(5).required();

var model = _joi["default"].string().trim().min(1).required();

var year = _joi["default"].number().integer().min(4).required();

var capacity = _joi["default"].number().integer().min(5).required();

var BusCreateSchema = {
  numberPlate: numberPlate,
  manufacturer: manufacturer,
  model: model,
  year: year,
  capacity: capacity
};
var _default = {
  BusCreateSchema: BusCreateSchema
};
exports["default"] = _default;
//# sourceMappingURL=busValidator.js.map