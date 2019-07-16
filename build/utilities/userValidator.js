"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firstName = _joi["default"].string().trim(true).min(3).regex(/^[A-Za-z]*$/).error(function () {
  return 'enter a valid firstName and name must not be less than 3 character';
}).min(1).required();

var lastName = _joi["default"].string().trim().min(3).regex(/^[A-Za-z]*$/).error(function () {
  return 'enter a valid Lastname and name must not be less than 3 character';
}).min(1).required();

var email = _joi["default"].string().email().trim().min(8).min(1).required();

var password = _joi["default"].string().trim().min(1).required();

var phoneNumber = _joi["default"].number().integer().min(11).required();

var isAdmin = _joi["default"]["boolean"]().required();

var userSignupSchema = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
  phoneNumber: phoneNumber,
  isAdmin: isAdmin
};
var userSigninSchema = {
  email: email,
  password: password
};
var _default = {
  userSignupSchema: userSignupSchema,
  userSigninSchema: userSigninSchema
};
exports["default"] = _default;
//# sourceMappingURL=userValidator.js.map