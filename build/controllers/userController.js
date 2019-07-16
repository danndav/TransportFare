"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userServices = _interopRequireDefault(require("../utilities/services/userServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class UserController
 */
var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "createUser",

    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    value: function createUser(req, res) {
      _userServices["default"].saveUser(req.body).then(function (data) {
        return res.status(201).json({
          status: 201,
          data: data,
          message: 'New user created successfully'
        });
      })["catch"](function (err) {
        if (err.rowCount >= 1) {
          return res.status(400).json({
            status: 400,
            message: 'User with this email exists already'
          });
        }
        /* istanbul ignore next-line */


        return res.status(400).json({
          message: 'Could not create user'
        });
      });
    }
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      _userServices["default"].validateUserLogin(email, password).then(function (data) {
        return res.status(200).json({
          status: 200,
          data: data,
          message: 'Authentication Successful'
        });
      })["catch"](function (err) {
        return res.status(401).json({
          status: 401,
          responseMessage: err
        });
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=userController.js.map