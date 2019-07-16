"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _queries = _interopRequireDefault(require("../utilities/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var userToken = '';
before(function () {
  var plateNumber = 'test123test';
  return _queries["default"].deleteBusByplateNumber(plateNumber).then(function (res) {})["catch"](function () {});
});
before(function () {
  it('it should login user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'dapo@gmail.com',
      password: 'dapo'
    }).end(function (err, res) {
      userToken = res.body.data.token;
      res.body.should.have.property('status').to.equals(200);
      res.body.should.have.property('data').to.be.an('object');
      done();
    });
  });
});
describe('UNIT TESTS FOR Buses', function () {
  /*
     * Test the /GET route
     */
  describe('/POST REQUEST', function () {
    it('it should create bus ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/buses').set('authorization', "Bearer ".concat(userToken)).send({
        numberPlate: 'test123test',
        manufacturer: 'toyota',
        model: 'camry',
        year: '2015',
        capacity: '10'
      }).end(function (err, res) {
        //   user = res.body.data.accountNumber;
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('New Bus created successfully');
        done();
      });
    });
    it('it should not create empty bus ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/buses').set('authorization', "Bearer ".concat(userToken)).send({}).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        res.body.should.have.property('message').to.equals('Please fill all fields');
        done();
      });
    });
    it('it should not create bus with existing plate number', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/buses').set('authorization', "Bearer ".concat(userToken)).send({
        numberPlate: 'test123test',
        manufacturer: 'toyota',
        model: 'camry',
        year: '2015',
        capacity: '10'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        res.body.should.have.property('message').to.equals('Bus with this platenumber exists already');
        done();
      });
    });
    it('it should not create bus with unauthorised user', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/buses').set('authorization', "Bearer ".concat(23456)).send({
        numberPlate: 'test123test',
        manufacturer: 'toyota',
        model: 'camry',
        year: '2015',
        capacity: '10'
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('status').to.equals(401);
        res.body.should.have.property('error').to.equals('Authentication Failed');
        done();
      });
    });
    it('it should not create bus with wrong parameters ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/buses').set('authorization', "Bearer ".concat(userToken)).send({
        numberPlate: 'test123test',
        manufacturer: 'toyota',
        model: 'camry',
        year: '2015',
        capacity: 'rrt'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        done();
      });
    });
  });
});
//# sourceMappingURL=bus.test.js.map