/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import queryProivider from '../utilities/queries';

chai.use(chaiHttp);
chai.should();

let userToken = '';

before(() => {
  const plateNumber = 'test123test';
  return queryProivider.deleteBusByplateNumber(plateNumber).then((res) => {}).catch(() => {});
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
        userToken = res.body.data.token;
        res.body.should.have.property('status').to.equals(200);
        res.body.should.have.property('data').to.be.an('object');
        done();
      });
  });
});


describe('UNIT TESTS FOR Buses', () => {
  /*
     * Test the /GET route
     */
  describe('/POST REQUEST', () => {
    it('it should create bus ', (done) => {
      chai
        .request(server)
        .post('/api/v1/buses')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          number_plate: 'test123test',
          manufacturer: 'toyota',
          model: 'camry',
          year: '2015',
          capacity: '10',
        })
        .end((err, res) => {
        //   user = res.body.data.accountNumber;

          res.should.have.status(201);
          res.body.should.have.property('status').to.equals(201);
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('New Bus created successfully');

          done();
        });
    });

    it('it should not create empty bus ', (done) => {
      chai
        .request(server)
        .post('/api/v1/buses')
        .set('authorization', `Bearer ${userToken}`)
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

    it('it should not create bus with existing plate number', (done) => {
      chai
        .request(server)
        .post('/api/v1/buses')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          number_plate: 'test123test',
          manufacturer: 'toyota',
          model: 'camry',
          year: '2015',
          capacity: '10',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);
          res.body.should.have
            .property('message')
            .to.equals('Bus with this platenumber exists already');

          done();
        });
    });


    it('it should not create bus with unauthorised user', (done) => {
      chai
        .request(server)
        .post('/api/v1/buses')
        .set('authorization', `Bearer ${23456}`)
        .send({
          number_plate: 'test123test',
          manufacturer: 'toyota',
          model: 'camry',
          year: '2015',
          capacity: '10',
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


    it('it should not create bus with wrong parameters ', (done) => {
      chai
        .request(server)
        .post('/api/v1/buses')
        .set('authorization', `Bearer ${userToken}`)
        .send({
          number_plate: 'test123test',
          manufacturer: 'toyota',
          model: 'camry',
          year: '2015',
          capacity: 'rrt',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals(400);

          done();
        });
    });
  });
});
