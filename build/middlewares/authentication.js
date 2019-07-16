"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = _interopRequireDefault(require("../utilities/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class DummyAuthentication
 * @description To verify user
 * @exports Authorization
 */
var Authorization =
/*#__PURE__*/
function () {
  function Authorization() {
    _classCallCheck(this, Authorization);
  }

  _createClass(Authorization, null, [{
    key: "verifyUser",

    /**
     * @param  {object} req - The user request object
     * @param  {object} res - The user res response object
     * @param  {function} next - The next() Function
     * @returns {object} payload
     */
    value: function verifyUser(req, res, next) {
      try {
        var token = req.headers.authorization.split(' ')[1];

        var decoded = _helper["default"].verifyToken(token);

        req.userData = decoded;
        return next();
      } catch (error) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'user not found, please register to perform this action'
        });
      }
    }
    /**
     * @param  {object} req - The Admin request object
     * @param  {object} res - The Admin res response object
     * @param  {function} next - The next() Function
     * @returns {object} payload
     */

  }, {
    key: "verifyAdmin",
    value: function verifyAdmin(req, res, next) {
      try {
        var token = req.headers.authorization.split(' ')[1];

        var decoded = _helper["default"].verifyToken(token);

        req.userData = decoded;

        if (req.userData.isAdmin === false) {
          return res.status(403).send({
            status: res.statusCode,
            error: 'You are not authorized to perform this action'
          });
        }

        return next();
      } catch (error) {
        return res.status(401).send({
          status: res.statusCode,
          error: 'Authentication Failed'
        });
      }
    }
  }]);

  return Authorization;
}();

var _default = Authorization;
exports["default"] = _default;
//# sourceMappingURL=authentication.js.map