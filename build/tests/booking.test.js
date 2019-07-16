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
  var tripId = 2;
  return _queries["default"].deleteTripIdFromBooking(tripId).then(function (res) {})["catch"](function () {});
});
before(function () {
  var seatNumber = 10;
  return _queries["default"].deleteSeatNumber(seatNumber).then(function (res) {})["catch"](function () {});
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
      email: 'seun@gmail.com',
      password: 'seun'
    }).end(function (err, res) {
      userToken = res.body.data.token;
      res.body.should.have.property('status').to.equals(200);
      res.body.should.have.property('data').to.be.an('object');
      done();
    });
  });
});
describe('UNIT TESTS TO CREATE booking', function () {
  describe('/POST REQUEST', function () {
    it('it should create Booking ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/bookings').set('authorization', "Bearer ".concat(adminToken)).send({
        tripId: 2,
        seatNumber: 10
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('New Booking created successfully');
        done();
      });
    });
    it('it should not create empty booking ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/bookings').set('authorization', "Bearer ".concat(adminToken)).send({}).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        res.body.should.have.property('message').to.equals('Please fill all fields');
        done();
      });
    });
    it('it should not create  booking unauthorised ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/bookings').set('authorization', "Bearer ".concat(23456)).send({
        tripId: 2,
        seatNumber: 10
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('status').to.equals(401);
        res.body.should.have.property('error').to.equals('user not found, please register to perform this action');
        done();
      });
    });
    it('it should not create  booking with wrong parameters ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/bookings').set('authorization', "Bearer ".concat(adminToken)).send({
        tripId: 'u',
        seatNumber: 10
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        done();
      });
    });
    it('it should not create  booking with an active seatnumber ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/bookings').set('authorization', "Bearer ".concat(adminToken)).send({
        tripId: 2,
        seatNumber: 10
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('Status').to.equals(400);
        console.log(res);
        done();
      });
    });
  });
});
describe('UNIT TESTS FOR bookings', function () {
  /*
     * Test the /GET route
     */
  describe('/GET REQUEST', function () {
    it('it should GET all bookings by admin', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/bookings/').set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
        res.body.should.have.property('message').to.equals('Successfully fetched all Bookings');
        res.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
    });
    it('it should not feched with unauthorised user', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/bookings/').set('authorization', "Bearer ".concat(111)).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('status').to.equals(401);
        res.body.should.have.property('error').to.equals('user not found, please register to perform this action');
        done();
      });
    });
  });
  describe('/PATCH REQUEST', function () {
    it('it should patch Booking ', function (done) {
      var tripId = 2;

      _chai["default"].request(_app["default"]).patch("/api/v1/bookings/".concat(tripId)).set('authorization', "Bearer ".concat(userToken)).send({
        seatNumber: 9
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('Booking SeatNumber Updated Successfully');
        done();
      });
    });
    it('it should not patch unavailabe booking ', function (done) {
      var tripId = 1234;

      _chai["default"].request(_app["default"]).patch("/api/v1/bookings/".concat(tripId)).set('authorization', "Bearer ".concat(userToken)).send({
        seatNumber: 9
      }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.have.property('status').to.equals(404);
        res.body.should.have.property('error').to.equals('This Booking does not exist');
        done();
      });
    });
    it('it should not patch bookings', function (done) {
      var tripId = 2;

      _chai["default"].request(_app["default"]).patch("/api/v1/bookings/".concat(tripId)).set('authorization', "Bearer ".concat(3456)).send({
        seatNumber: 9
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('status').to.equals(401);
        res.body.should.have.property('error').to.equals('user not found, please register to perform this action');
        done();
      });
    });
  }); // describe('/DELETE REQUEST', () => {
  //   it('it should delete Booking ', (done) => {
  //     const BookId = user;
  //     chai
  //       .request(server)
  //       .delete(`/api/v1/bookings/${BookId}`)
  //       .set('authorization', `Bearer ${userToken}`)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property('status').to.equals(200);
  //         res.body.should.have
  //           .property('message')
  //           .to.equals('Booking deleted Successfully');
  //         done();
  //       });
  //   });
  //   it('it should not delete unfound  account ', (done) => {
  //     const accounNumber = 234567;
  //     chai
  //       .request(server)
  //       .delete(`/api/v1/accounts/${accounNumber}`)
  //       .set('authorization', `Bearer ${userToken}`)
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         res.body.should.have
  //           .property('error')
  //           .to.equals('This account does not exist');
  //         done();
  //       });
  //   });
  // });
});
//# sourceMappingURL=booking.test.js.map