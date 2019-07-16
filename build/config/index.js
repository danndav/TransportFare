"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var config = {
  testDB: process.env.TEST_DATABASE_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY
};
var _default = config;
exports["default"] = _default;
//# sourceMappingURL=index.js.map