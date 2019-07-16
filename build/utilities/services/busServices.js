"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _queries = _interopRequireDefault(require("../queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** export default UserService;
 * @exports
 * @class BusServices
 */
var BusServices =
/*#__PURE__*/
function () {
  function BusServices() {
    _classCallCheck(this, BusServices);
  }

  _createClass(BusServices, null, [{
    key: "saveBus",

    /**
       * save new bus
       * @staticmethod
       * @param  {string} body - Request object
       * @param  {string} userid - Request object
       * @return {string} res
       */
    value: function saveBus(body, userid) {
      return new Promise(function (resolve, reject) {
        _queries["default"].saveBusQuery(body, userid).then(function (res) {
          var data = {
            id: res.rows[0].id,
            userid: res.rows[0].userid,
            numberPlate: res.rows[0].number_plate,
            manufacturer: res.rows[0].manufacturer,
            model: res.rows[0].model,
            year: res.rows[0].year,
            capacity: res.rows[0].capacity,
            createdAt: res.rows[0].createdon
          };
          resolve(data);
        })["catch"](function (err) {
          console.log('err1', err);
          return reject(err);
        });
      });
    }
  }]);

  return BusServices;
}();

var _default = BusServices;
exports["default"] = _default;
//# sourceMappingURL=busServices.js.map