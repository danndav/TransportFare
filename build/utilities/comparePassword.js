"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class comparePassword
 */
var ComparePassword =
/*#__PURE__*/
function () {
  function ComparePassword() {
    _classCallCheck(this, ComparePassword);
  }

  _createClass(ComparePassword, null, [{
    key: "compare",

    /**
       * Userhelper Class
       * @staticmethod
       * @param  {string} newpassword
       * @param {string} dbpassword
       * @return {number} a
       */
    value: function compare(newpassword, dbpassword) {
      return new Promise(function (resolve, reject) {
        // Load hash from your password DB.
        _bcrypt["default"].compare(newpassword, dbpassword).then(function (response) {
          if (response) {
            resolve('Password Matched');
          } else {
            /* istanbul ignore next-line */
            reject(new Error('Password not matched'));
          }
        });
      });
    }
  }]);

  return ComparePassword;
}();

var _default = ComparePassword;
exports["default"] = _default;
//# sourceMappingURL=comparePassword.js.map