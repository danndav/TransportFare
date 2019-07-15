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
        email: 'isreal@gmail.com',
        password: 'isreal',
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
            .to.equals('Authentication Failed');

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

// // describe('UNIT TESTS FOR bookings', () => {
// //   /*
// //      * Test the /GET route
// //      */
// //   describe('/GET REQUEST', () => {
// //     it('it should GET all bookingss', (done) => {
// //       chai
// //         .request(server)
// //         .get('/api/v1/bookings/')
// //         .set('authorization', `Bearer ${adminToken}`)
// //         .end((err, res) => {
// //           res.body.should.have
// //             .property('message')
// //             .to.equals('Successfully fetched all bookings');
// //           res.should.have.property('status').to.equals(200);
// //           res.body.should.have.property('data').to.be.an('array');
// //           done();
// //         });
// //     });

// //     it('it should not feched with unauthorised user', (done) => {
// //       chai
// //         .request(server)
// //         .get('/api/v1/bookings/')
// //         .set('authorization', `Bearer ${userToken}`)
// //         .end((err, res) => {
// //           res.should.have.status(403);
// //           res.body.should.have.property('status').to.equals(403);
// //           res.body.should.have
// //             .property('error')
// //             .to.equals('You are not authorized to perform this action');


// //           done();
// //         });
// //     });
// //   });

// //   describe('/PATCH REQUEST', () => {
// //     it('it should patch booking ', (done) => {
// //       const id = 1;
// //       chai
// //         .request(server)
// //         .patch(`/api/v1/bookings/${id}`)
// //         .set('authorization', `Bearer ${adminToken}`)
// //         .send({
// //           status: 'active',
// //         })
// //         .end((err, res) => {
// //           res.should.have.status(200);
// //           res.body.should.have.property('status').to.equals(200);
// //           res.body.should.have.property('data').to.be.an('object');
// //           res.body.should.have
// //             .property('message')
// //             .to.equals('booking Status Updated Successfully');


// //           done();
// //         });
// //     });

// //     it('it should not patch unavailabe booking ', (done) => {
// //       const id = 1234568;
// //       chai
// //         .request(server)
// //         .patch(`/api/v1/bookings/${id}`)
// //         .set('authorization', `Bearer ${adminToken}`)
// //         .send({
// //           status: 'active',
// //         })
// //         .end((err, res) => {
// //           res.should.have.status(404);
// //           res.body.should.have.property('status').to.equals(404);
// //           res.body.should.have
// //             .property('error')
// //             .to.equals('This booking does not exist');


// //           done();
// //         });
// //     });


// //     it('it should not booking unauthorised', (done) => {
// //       const id = 1;

// //       chai
// //         .request(server)
// //         .patch(`/api/v1/bookings/${id}`)
// //         .set('authorization', `Bearer ${3456}`)
// //         .send({
// //           status: 'active',
// //         })
// //         .end((err, res) => {
// //           res.should.have.status(401);
// //           res.body.should.have.property('status').to.equals(401);
// //           res.body.should.have
// //             .property('error')
// //             .to.equals('Authentication Failed');


// //           done();
// //         });
// //     });
// //   });
// });
