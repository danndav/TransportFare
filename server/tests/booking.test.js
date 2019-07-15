/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import queryProivider from '../utilities/queries';

chai.use(chaiHttp);
chai.should();

let adminToken = '';
let userToken = '';

before(() => {
  const tripId = 2;
  return queryProivider.deleteTripIdFromBooking(tripId).then((res) => {}).catch(() => {});
});
before(() => {
  const seatNumber = 10;
  return queryProivider.deleteSeatNumber(seatNumber).then((res) => {}).catch(() => {});
});


before(() => {
  it('it should login user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dapo@gmail.com',
        password: 'dapo',
      })
      .end((err, res) => {
        adminToken = res.body.data.token;
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });

  it('it should login user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'seun@gmail.com',
        password: 'seun',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });
});

describe('UNIT TESTS TO CREATE booking', () => {
  describe('/POST REQUEST', () => {
    it('it should create Booking ', (done) => {
      chai
        .request(server)
        .post('/api/v1/bookings')
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          tripId: 2,
          seatNumber: 10,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('New Booking created successfully');
          done();
        });
    });

    it('it should not create empty booking ', (done) => {
      chai
        .request(server)
        .post('/api/v1/bookings')
        .set('authorization', `Bearer ${adminToken}`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have
            .property('message')
            .to.equals('Please fill all fields');

          done();
        });
    });


    it('it should not create  booking unauthorised ', (done) => {
      chai
        .request(server)
        .post('/api/v1/bookings')
        .set('authorization', `Bearer ${23456}`)
        .send({
          tripId: 2,
          seatNumber: 10,
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('status').to.equals(401);
          res.body.should.have
            .property('error')
            .to.equals('user not found, please register to perform this action');

          done();
        });
    });


    it('it should not create  booking with wrong parameters ', (done) => {
      chai
        .request(server)
        .post('/api/v1/bookings')
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          tripId: 'u',
          seatNumber: 10,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });

    //     it('it should not create  booking with a wrong id ', (done) => {
    //       chai
    //         .request(server)
    //         .post('/api/v1/bookings')
    //         .set('authorization', `Bearer ${adminToken}`)
    //         .send({
    //           tripId: 2,
    //           seatNumber: 10,
    //         })
    //         .end((err, res) => {
    //           res.should.have.status(400);
    //           res.body.should.have.property('status').to.equals(400);

    //           done();
    //         });
    //     });

    //     it('it should not create  booking with an active seatnumber ', (done) => {
    //       chai
    //         .request(server)
    //         .post('/api/v1/bookings')
    //         .set('authorization', `Bearer ${adminToken}`)
    //         .send({
    //           tripId: 2,
    //           seatNumber: 10,
    //         })
    //         .end((err, res) => {
    //           res.should.have.status(400);
    //           res.body.should.have.property('status').to.equals(400);
    //           console.log(res);

    //           done();
    //         });
    //     });
  });
});

describe('UNIT TESTS FOR bookings', () => {
  /*
     * Test the /GET route
     */
  describe('/GET REQUEST', () => {
    it('it should GET all bookings by admin', (done) => {
      chai
        .request(server)
        .get('/api/v1/bookings/')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have
            .property('message')
            .to.equals('Successfully fetched all Bookings');
          res.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });


    it('it should not feched with unauthorised user', (done) => {
      chai
        .request(server)
        .get('/api/v1/bookings/')
        .set('authorization', `Bearer ${111}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('status').to.equals(401);
          res.body.should.have
            .property('error')
            .to.equals('user not found, please register to perform this action');


          done();
        });
    });
  });
});
