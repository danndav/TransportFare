"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _queries = _interopRequireDefault(require("../utilities/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

before(function () {
  var email = 'tester@gmail.com';
  return _queries["default"].deleteUserByEmailQuery(email).then(function (res) {})["catch"](function () {});
}); // eslint-disable-next-line no-undef

describe('UNIT TESTS FOR DUMMY USER CONTROLLERS', function () {
  /*
   * Test the /GET route
  */
}); // eslint-disable-next-line no-undef

describe('/POST REQUEST', function () {
  it('it should signup user ', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'tester@gmail.com',
      firstName: 'hello',
      lastName: 'Abass',
      phoneNumber: '08023461217',
      password: 'tolaniabass',
      isAdmin: false
    }).end(function (err, res) {
      res.body.should.have.property('message').to.equals('New user created successfully');
      res.body.should.have.property('status').to.equals(201);
      res.body.should.have.property('data').to.be.a('object');
      done();
    });
  });
  it('it should not signup empty user ', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({}).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('message').to.equals('Please fill all fields');
      res.body.should.have.property('status').to.equals(400);
      done();
    });
  });
  it('it should not signup invalid firstnane ', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'tester@gmail.com',
      firstName: 'hel//lo',
      lastName: 'Abass',
      phoneNumber: '08023461217',
      password: 'tolaniabass',
      isAdmin: false
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('status').to.equals(400);
      done();
    });
  });
  it('it should not signup invalid lastname', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'tester@gmail.com',
      firstName: 'hello',
      lastName: 'Abas\\s',
      phoneNumber: '08023461217',
      password: 'tolaniabass',
      isAdmin: false
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('status').to.equals(400);
      done();
    });
  });
  it('it should not signup user that exist', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'dannain@gmail.com',
      firstName: 'danieli',
      lastName: 'david',
      phoneNumber: '08119047808',
      password: 'danieldavid',
      isAdmin: true
    }).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('status').to.equals(400);
      res.body.should.have.property('message').to.equals('User with this email exists already');
      done();
    });
  });
  it('it should check for empty user', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({}).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('status').to.equals(400);
      res.body.should.have.property('message').to.equals('Please fill all fields');
      done();
    });
  });
  describe('/POST REQUEST', function () {
    it('it should signin user ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'dannaing@gmail.com',
        password: 'danieldavid'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        res.body.should.have.property('message').to.equals('Authentication Successful');
        done();
      });
    });
    it('it should not  signin user ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({}).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        res.body.should.have.property('message').to.equals('Please fill all fields');
        done();
      });
    });
    it('it should not  signin user with wrong input', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'tolaniabassgmail.com',
        password: 'tolaniabass'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        done();
      });
    });
    it('it should check for unregistered email and wrong password ', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'yyysttt@gmail.com',
        password: 'tolaniabass'
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('responseMessage').to.equals('Wrong Email and Password Combination. Please Check your credentials');
        done();
      });
    });
  });
});
//# sourceMappingURL=user.test.js.map