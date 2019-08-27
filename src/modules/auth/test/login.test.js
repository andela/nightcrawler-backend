import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';

describe('USER CONTROLLER', () => {
  describe('POST SIGN IN', () => {
    it('it should login a user with valid email and password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'admin@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('username');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('emailVerifiedAt');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('profileImage');
          expect(res.body.data).to.have.property('roleId');
          expect(res.body.data).to.have.property('createdAt');
          expect(res.body.data).to.have.property('updatedAt');
          done();
        });
    });

    it('it should not login a non-existent user', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'nonexist@nomad.com', // user does not exist in database
          password: '123456',
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.property('credentials');
          expect(res.body.errors.credentials).to.equal('email or password incorrect');
          done();
        });
    });

    it('it should not login a user with wrong password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'admin@nomad.com',
          password: '123', // incorrect password
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.property('credentials');
          expect(res.body.errors.credentials).to.equal('email or password incorrect');
          done();
        });
    });
  });
});
