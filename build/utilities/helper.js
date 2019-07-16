"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../config/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class helperClass
 */
var helperClass =
/*#__PURE__*/
function () {
  function helperClass() {
    _classCallCheck(this, helperClass);
  }

  _createClass(helperClass, null, [{
    key: "verifyToken",

    /**
     * Userhelper Class
     * @staticmethod VerifyToken
     * @param  {array} dataStore
     * @param {string} email
     * @param {string} type
     * @return {string}
     */
    value: function verifyToken(token) {
      var decoded = _jsonwebtoken["default"].verify(token, _index["default"].jwtSecretKey);

      console.log(decoded);
      return decoded;
    }
  }]);

  return helperClass;
}();

var _default = helperClass;
exports["default"] = _default;
//# sourceMappingURL=helper.js.map