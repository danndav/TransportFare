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
  const busId = 18;
  return queryProivider.deleteTripByBusid(busId).then((res) => {}).catch(() => {});
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

describe('UNIT TESTS TO CREATE Trip', () => {
  describe('/POST REQUEST', () => {
    it('it should create Trip ', (done) => {
      chai
        .request(server)
        .post('/api/v1/trips')
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          origin: 'testfrom',
          destination: 'testto',
          trip_date: '3-10-2019',
          fare: '100',
          status: 'active',
          bus_id: 18,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('New Trip created successfully');

          done();
        });
    });

    it('it should not create empty trip ', (done) => {
      chai
        .request(server)
        .post('/api/v1/trips')
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


    it('it should not create  Trip unauthorised ', (done) => {
      chai
        .request(server)
        .post('/api/v1/trips')
        .set('authorization', `Bearer ${23456}`)
        .send({
          origin: 'testfrom',
          destination: 'testto',
          trip_date: '3-10-2019',
          fare: '100',
          status: 'active',
          bus_id: 18,
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


    it('it should not create  Trip with wrong parameters ', (done) => {
      chai
        .request(server)
        .post('/api/v1/trips')
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          origin: 'testfrom',
          destination: 'testto',
          trip_date: '3-10-2019',
          fare: '100',
          status: 'activ',
          bus_id: 18,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });

    it('it should not create  Trip a wrong id ', (done) => {
      chai
        .request(server)
        .post('/api/v1/trips')
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          origin: 'testfrom',
          destination: 'testto',
          trip_date: '3-10-2019',
          fare: '100',
          status: 'active',
          bus_id: 999,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });

    it('it should not create  Trip with an active busid ', (done) => {
      chai
        .request(server)
        .post('/api/v1/trips')
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          origin: 'testfrom',
          destination: 'testto',
          trip_date: '3-10-2019',
          fare: '100',
          status: 'activ',
          busId: 1,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });
  });
});

describe('UNIT TESTS FOR Trips', () => {
  /*
     * Test the /GET route
     */
  describe('/GET REQUEST', () => {
    it('it should GET all tripss', (done) => {
      chai
        .request(server)
        .get('/api/v1/trips/')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.body.should.have
            .property('message')
            .to.equals('Successfully fetched all Trips');
          res.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should not feched with unauthorised user', (done) => {
      chai
        .request(server)
        .get('/api/v1/trips/')
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

    describe('/GET REQUEST', () => {
      it('it should GET all trips by origin', (done) => {
        const origin = 'lekki';
        chai
          .request(server)
          .get(`/api/v1/trips/search/?origin=${origin}`)
          .set('authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            res.body.should.have
              .property('message')
              .to.equals('Successfully fetched all Trips by origin');
            res.should.have.property('status').to.equals(200);
            res.body.should.have.property('data').to.be.an('array');

            done();
          });
      });
      it('it should GET all trips by destination', (done) => {
        const destination = 'ikeja';
        chai
          .request(server)
          .get(`/api/v1/trips/search/?destination=${destination}`)
          .set('authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            res.body.should.have
              .property('message')
              .to.equals('Successfully fetched all Trips by Destination');
            res.should.have.property('status').to.equals(200);
            res.body.should.have.property('data').to.be.an('array');
            done();
          });
      });
      it('it should GET all trips by origin and Destination', (done) => {
        const origin = 'lekki';
        const destination = 'ikeja';
        chai
          .request(server)
          .get(`/api/v1/trips/search/?origin=${origin}&destination=${destination}`)
          .set('authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            res.body.should.have
              .property('message')
              .to.equals('Successfully fetched all Trips by Origin and Destination');
            res.should.have.property('status').to.equals(200);
            res.body.should.have.property('data').to.be.an('array');
            done();
          });
      });


      it('it should not GET all trips by origin', (done) => {
        const origin = 'lekkii';
        chai
          .request(server)
          .get(`/api/v1/trips/search/?origin=${origin}`)
          .set('authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            res.body.should.have
              .property('Message')
              .to.equals('Trips origin cant be  fetched');
            res.should.have.property('status').to.equals(400);

            done();
          });
      });
      it('it should not GET all trips by destination', (done) => {
        const destination = 'ikejaa';
        chai
          .request(server)
          .get(`/api/v1/trips/search/?destination=${destination}`)
          .set('authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            res.body.should.have
              .property('Message')
              .to.equals('Trips destination cant be fetched');
            res.should.have.property('status').to.equals(400);
            done();
          });
      });
      it('it should not GET all trips by origin and Destination', (done) => {
        const origin = 'lekkiw';
        const destination = 'ikejaw';
        chai
          .request(server)
          .get(`/api/v1/trips/search/?origin=${origin}&destination=${destination}`)
          .set('authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            res.body.should.have
              .property('Message')
              .to.equals('Trips destination and origin cant be fetched');
            res.should.have.property('status').to.equals(400);
            done();
          });
      });
    });
  });

  describe('/PATCH REQUEST', () => {
    it('it should patch trip ', (done) => {
      const id = 2;
      chai
        .request(server)
        .patch(`/api/v1/trips/${id}`)
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          status: 'active',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals(200);
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('Trip Status Updated Successfully');


          done();
        });
    });

    it('it should not patch unavailabe trip ', (done) => {
      const id = 1234568;
      chai
        .request(server)
        .patch(`/api/v1/trips/${id}`)
        .set('authorization', `Bearer ${adminToken}`)
        .send({
          status: 'active',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').to.equals(404);
          res.body.should.have
            .property('error')
            .to.equals('This Trip does not exist');


          done();
        });
    });


    it('it should not trip unauthorised', (done) => {
      const id = 1;

      chai
        .request(server)
        .patch(`/api/v1/trips/${id}`)
        .set('authorization', `Bearer ${3456}`)
        .send({
          status: 'active',
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
  });
});
