/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import queryProivider from '../utilities/queries';

chai.use(chaiHttp);
chai.should();

let adminToken = '';
let userToken = '';
let BookId = '';

before(() => {
  const trip_id = 2;
  return queryProivider.deleteTripIdFromBooking(trip_id).then((res) => {}).catch(() => {});
});
before(() => {
  const seat_number = 10;
  return queryProivider.deleteSeatNumber(seat_number).then((res) => {}).catch(() => {});
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
          trip_id: 2,
          seat_number: 10,
        })
        .end((err, res) => {
          BookId = res.body.data.id;
          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('New Booking created successfully');
          console.log(res);
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
          trip_id: 2,
          seat_number: 10,
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
          trip_id: 'u',
          seat_number: 10,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });


    it('it should not create  booking with an active seatnumber ', (done) => {
      chai
        .request(server)
        .post('/api/v1/bookings')
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          trip_id: 2,
          seat_number: 10,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('Status').to.equals(400);
          console.log(res);

          done();
        });
    });
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

  describe('/PATCH REQUEST', () => {
    it('it should patch Booking ', (done) => {
      const trip_id = 2;
      chai
        .request(server)
        .patch(`/api/v1/bookings/${trip_id}`)
        .set('authorization', `Bearer ${userToken}`)
        .send({
          seat_number: 9,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('Booking SeatNumber Updated Successfully');


          done();
        });
    });

    it('it should not patch unavailabe booking ', (done) => {
      const trip_id = 1234;
      chai
        .request(server)
        .patch(`/api/v1/bookings/${trip_id}`)
        .set('authorization', `Bearer ${userToken}`)
        .send({
          seat_number: 9,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have
            .property('error')
            .to.equals('This Booking does not exist');


          done();
        });
    });


    it('it should not patch bookings', (done) => {
      const trip_id = 2;
      chai
        .request(server)
        .patch(`/api/v1/bookings/${trip_id}`)
        .set('authorization', `Bearer ${3456}`)
        .send({
          seat_number: 9,
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
  });


  // describe('/DELETE REQUEST', () => {
  //   it('it should delete Booking ', (done) => {
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

  //         console.log('worldddd', res, BookId);
  //         done();
  //       });
  //   });


  //   it('it should not delete unfound  Booking ', (done) => {
  //     chai
  //       .request(server)
  //       .delete(`/api/v1/accounts/${555}`)
  //       .set('authorization', `Bearer ${userToken}`)
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         res.body.should.have
  //           .property('error')
  //           .to.equals('This Booking does not exist');
  //         console.log(res);
  //         done();
  //       });
  //   });
  // });
});
