"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _index = _interopRequireDefault(require("../../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectionString = _index["default"].testDB;
var client = new _pg.Pool({
  connectionString: connectionString
});
client.connect();
var _default = client;
exports["default"] = _default;
//# sourceMappingURL=connect.js.map