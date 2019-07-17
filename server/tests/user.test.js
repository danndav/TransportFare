/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import queryProivider from '../utilities/queries';

chai.use(chaiHttp);
chai.should();

before(() => {
  const email = 'tester@gmail.com';
  return queryProivider.deleteUserByEmailQuery(email).then((res) => {}).catch(() => {});
});


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
        email: 'tester@gmail.com',
        first_name: 'hello',
        last_name: 'Abass',
        password: 'tolaniabass',
       
      })
      .end((err, res) => {
        // res.body.should.have
        //   .property('message')
        //   .to.equals('New user created successfully');
        // res.body.should.have.property('status').to.equals('success');
        // res.body.should.have.property('data').to.be.a('object');
        console.log(res)
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
          .property('error')
          .to.equals('Please fill all fields');
        res.body.should.have.property('status').to.equals('error');

        done();
      });
  });

  it('it should not signup invalid firstnane ', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'tester@gmail.com',
        first_name: 'hel//lo',
        last_name: 'Abass',
        phone_number: '08023461217',
        password: 'tolaniabass',
        is__admin: false,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals('error');

        done();
      });
  });


  it('it should not signup invalid lastname', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'tester@gmail.com',
        first_name: 'hello',
        last_name: 'Abas\\s',
        phone_number: '08023461217',
        password: 'tolaniabass',
        is_admin: false,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals('error');

        done();
      });
  });

  it('it should not signup user that exist', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'dannain@gmail.com',
        first_name: 'danieli',
        last_name: 'david',
        password: 'danieldavid',
       
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').to.equals('error');
        res.body.should.have
          .property('error')
          .to.equals('This email already exists please sign with a different email.');

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
        res.body.should.have.property('status').to.equals('error');
        res.body.should.have
          .property('error')
          .to.equals('Please fill all fields');

        done();
      });
  });

  describe('/POST REQUEST', () => {
    it('it should signin user ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'dannaing@gmail.com',
          password: 'danieldavid',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').to.equals('success');
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('message')
            .to.equals('Authentication Successful');

          done();
        });
    });


    it('it should not  signin user ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals('error');
          res.body.should.have
            .property('error')
            .to.equals('Please fill all fields');

          done();
        });
    });


    it('it should not  signin user with wrong input', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'tolaniabassgmail.com',
          password: 'tolaniabass',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').to.equals('error');


          done();
        });
    });


    it('it should check for unregistered email and wrong password ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'yyysttt@gmail.com',
          password: 'tolaniabass',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have
            .property('error')
            .to.equals('Wrong Email and Password Combination. Please Check your credentials');
          done();
        });
    });
  });
});
