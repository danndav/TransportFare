"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../../config/index"));

var _comparePassword = _interopRequireDefault(require("../comparePassword"));

var _queries = _interopRequireDefault(require("../queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class UserService
 */
var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, null, [{
    key: "findUserByEmail",

    /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    value: function findUserByEmail(email) {
      return new Promise(function (resolve, reject) {
        _queries["default"].findUserByEmailQuery(email).then(function (response) {
          return resolve(response);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
    /**
     * save new user
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */

  }, {
    key: "saveUser",
    value: function saveUser(body) {
      return new Promise(function (resolve, reject) {
        _queries["default"].saveUserQuery(body).then(function (res) {
          var token = _jsonwebtoken["default"].sign({
            id: res[0].id,
            email: res[0].email,
            isAdmin: res[0].isadmin
          }, _index["default"].jwtSecretKey, {
            expiresIn: 86400
          });

          var data = {
            token: token,
            id: res[0].id,
            firstName: res[0].firstname.trim(),
            lastName: res[0].lastname.trim(),
            email: res[0].email.trim(),
            isAdmin: res[0].isadmin
          };
          resolve(data);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
    /**
     * validateUserLogin
     * @staticmethod
     * @param  {string} email - newpassword
     *  @param  {string} userpassword - token
     * @return {string} res
     */

  }, {
    key: "validateUserLogin",
    value: function validateUserLogin(email, userpassword) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.findUserByEmail(email).then(function (res) {
          _comparePassword["default"].compare(userpassword, res.rows[0].password).then(function () {
            var token = _jsonwebtoken["default"].sign({
              id: res.rows[0].id,
              email: res.rows[0].email,
              isAdmin: res.rows[0].isadmin
            }, _index["default"].jwtSecretKey, {
              expiresIn: 86400
            });

            var data = {
              token: token,
              id: res.rows[0].id,
              firstName: res.rows[0].firstname,
              lastName: res.rows[0].lastname,
              email: res.rows[0].email,
              isAdmin: res.rows[0].isadmin
            };
            resolve(data);
          })["catch"](function () {
            /* istanbul ignore next-line */
            var response = 'Wrong Password and Email Combination';
            /* istanbul ignore next-line */

            reject(response);
          });
        })["catch"](function (err) {
          var response = 'Wrong Email and Password Combination. Please Check your credentials';
          reject(response);
        });
      });
    }
  }]);

  return UserService;
}();

var _default = UserService;
exports["default"] = _default;
//# sourceMappingURL=userServices.js.map