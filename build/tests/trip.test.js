"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _queries = _interopRequireDefault(require("../utilities/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var adminToken = '';
var userToken = '';
before(function () {
  var busId = 18;
  return _queries["default"].deleteTripByBusid(busId).then(function (res) {})["catch"](function () {});
});
before(function () {
  it('it should login user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'dapo@gmail.com',
      password: 'dapo'
    }).end(function (err, res) {
      adminToken = res.body.data.token;
      res.body.should.have.property('status').to.equals(200);
      res.body.should.have.property('data').to.be.an('object');
      done();
    });
  });
  it('it should login user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'isreal@gmail.com',
      password: 'isreal'
    }).end(function (err, res) {
      userToken = res.body.data.token;
      res.body.should.have.property('status').to.equals(200);
      res.body.should.have.property('data').to.be.an('object');
      done();
    });
  });
});
describe('UNIT TESTS TO CREATE Trip', function () {
  describe('/POST REQUEST', function () {
    it('it should create Trip ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/trips').set('authorization', "Bearer ".concat(adminToken)).send({
        origin: 'testfrom',
        destination: 'testto',
        tripDate: '3-10-2019',
        fare: '100',
        status: 'active',
        busId: 18
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('New Trip created successfully');
        done();
      });
    });
    it('it should not create empty trip ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/trips').set('authorization', "Bearer ".concat(adminToken)).send({}).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        res.body.should.have.property('message').to.equals('Please fill all fields');
        done();
      });
    });
    it('it should not create  Trip unauthorised ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/trips').set('authorization', "Bearer ".concat(23456)).send({
        origin: 'testfrom',
        destination: 'testto',
        tripDate: '3-10-2019',
        fare: '100',
        status: 'active',
        busId: 18
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('status').to.equals(401);
        res.body.should.have.property('error').to.equals('Authentication Failed');
        done();
      });
    });
    it('it should not create  Trip with wrong parameters ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/trips').set('authorization', "Bearer ".concat(adminToken)).send({
        origin: 'testfrom',
        destination: 'testto',
        tripDate: '3-10-2019',
        fare: '100',
        status: 'activ',
        busId: 18
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        done();
      });
    });
    it('it should not create  Trip a wrong id ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/trips').set('authorization', "Bearer ".concat(adminToken)).send({
        origin: 'testfrom',
        destination: 'testto',
        tripDate: '3-10-2019',
        fare: '100',
        status: 'active',
        busId: 999
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        done();
      });
    });
    it('it should not create  Trip with an active busid ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/trips').set('authorization', "Bearer ".concat(adminToken)).send({
        origin: 'testfrom',
        destination: 'testto',
        tripDate: '3-10-2019',
        fare: '100',
        status: 'activ',
        busId: 1
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        done();
      });
    });
  });
});
describe('UNIT TESTS FOR Trips', function () {
  /*
     * Test the /GET route
     */
  describe('/GET REQUEST', function () {
    it('it should GET all tripss', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/trips/').set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
        res.body.should.have.property('message').to.equals('Successfully fetched all Trips');
        res.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
    });
    it('it should not feched with unauthorised user', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/trips/').set('authorization', "Bearer ".concat(111)).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('status').to.equals(401);
        res.body.should.have.property('error').to.equals('user not found, please register to perform this action');
        done();
      });
    });
    describe('/GET REQUEST', function () {
      it('it should GET all trips by origin', function (done) {
        var origin = 'lekki';

        _chai["default"].request(_app["default"]).get("/api/v1/trips/search/?origin=".concat(origin)).set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
          res.body.should.have.property('message').to.equals('Successfully fetched all Trips by origin');
          res.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
      });
      it('it should GET all trips by destination', function (done) {
        var destination = 'ikeja';

        _chai["default"].request(_app["default"]).get("/api/v1/trips/search/?destination=".concat(destination)).set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
          res.body.should.have.property('message').to.equals('Successfully fetched all Trips by Destination');
          res.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
      });
      it('it should GET all trips by origin and Destination', function (done) {
        var origin = 'lekki';
        var destination = 'ikeja';

        _chai["default"].request(_app["default"]).get("/api/v1/trips/search/?origin=".concat(origin, "&destination=").concat(destination)).set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
          res.body.should.have.property('message').to.equals('Successfully fetched all Trips by Origin and Destination');
          res.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
      });
      it('it should not GET all trips by origin', function (done) {
        var origin = 'lekkii';

        _chai["default"].request(_app["default"]).get("/api/v1/trips/search/?origin=".concat(origin)).set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
          res.body.should.have.property('Message').to.equals('Trips origin cant be  fetched');
          res.should.have.property('status').to.equals(400);
          done();
        });
      });
      it('it should not GET all trips by destination', function (done) {
        var destination = 'ikejaa';

        _chai["default"].request(_app["default"]).get("/api/v1/trips/search/?destination=".concat(destination)).set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
          res.body.should.have.property('Message').to.equals('Trips destination cant be fetched');
          res.should.have.property('status').to.equals(400);
          done();
        });
      });
      it('it should not GET all trips by origin and Destination', function (done) {
        var origin = 'lekkiw';
        var destination = 'ikejaw';

        _chai["default"].request(_app["default"]).get("/api/v1/trips/search/?origin=".concat(origin, "&destination=").concat(destination)).set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
          res.body.should.have.property('Message').to.equals('Trips destination and origin cant be fetched');
          res.should.have.property('status').to.equals(400);
          done();
        });
      });
    });
  });
  describe('/PATCH REQUEST', function () {
    it('it should patch trip ', function (done) {
      var id = 2;

      _chai["default"].request(_app["default"]).patch("/api/v1/trips/".concat(id)).set('authorization', "Bearer ".concat(adminToken)).send({
        status: 'active'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('Trip Status Updated Successfully');
        done();
      });
    });
    it('it should not patch unavailabe trip ', function (done) {
      var id = 1234568;

      _chai["default"].request(_app["default"]).patch("/api/v1/trips/".concat(id)).set('authorization', "Bearer ".concat(adminToken)).send({
        status: 'active'
      }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.have.property('status').to.equals(404);
        res.body.should.have.property('error').to.equals('This Trip does not exist');
        done();
      });
    });
    it('it should not trip unauthorised', function (done) {
      var id = 1;

      _chai["default"].request(_app["default"]).patch("/api/v1/trips/".concat(id)).set('authorization', "Bearer ".concat(3456)).send({
        status: 'active'
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('status').to.equals(401);
        res.body.should.have.property('error').to.equals('Authentication Failed');
        done();
      });
    });
  });
});
//# sourceMappingURL=trip.test.js.map