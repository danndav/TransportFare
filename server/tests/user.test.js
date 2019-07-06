/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
chai.should();


// eslint-disable-next-line no-undef
describe('UNIT TESTS FOR DUMMY USER CONTROLLERS', () => {
  /*
   * Test the /GET route
  */
});
// eslint-disable-next-line no-undef
describe('/POST REQUEST', () => {
  it('it should signup user ', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'teesteerr@gmail.com',
        firstName: 'hello',
        lastName: 'Abass',
        phoneNumber: '08023461217',
        password: 'tolaniabass',
        isAdmin: false,
      })
      .end((err, res) => {
        res.body.should.have
          .property('message')
          .to.equals('New user created successfully');
        res.body.should.have.property('status').to.equals(201);
        res.body.should.have.property('data').to.be.a('object');
        done();
      });
  });

  it('it should not signup empty user ', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .to.equals('Please fill all fields');
        res.body.should.have.property('status').to.equals(400);

        done();
      });
  });

  it('it should not signup invalid firstnane ', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'tester@gmail.com',
        firstName: 'hel//lo',
        lastName: 'Abass',
        phoneNumber: '08023461217',
        password: 'tolaniabass',
        isAdmin: false,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);

        done();
      });
  });


  it('it should not signup invalid lastname', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'tester@gmail.com',
        firstName: 'hello',
        lastName: 'Abas\\s',
        phoneNumber: '08023461217',
        password: 'tolaniabass',
        isAdmin: false,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);

        done();
      });
  });

  it('it should not signup user that exist', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'dannain@gmail.com',
        firstName: 'danieli',
        lastName: 'david',
        phoneNumber: '08119047808',
        password: 'danieldavid',
        isAdmin: true,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals(400);
        res.body.should.have
          .property('message')
          .to.equals('User with this email exists already');

        done();
      });
  });

  it('it should check for empty user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
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
});
