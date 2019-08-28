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
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.a('object');
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('username');
          expect(res.body.payload).to.have.property('firstName');
          expect(res.body.payload).to.have.property('lastName');
          expect(res.body.payload).to.have.property('email');
          expect(res.body.payload).to.have.property('isVerified');
          expect(res.body.payload).to.have.property('token');
          expect(res.body.payload).to.have.property('profileImage');
          expect(res.body.payload).to.have.property('roleId');
          expect(res.body.payload).to.have.property('createdAt');
          expect(res.body.payload).to.have.property('updatedAt');
          done();
        });
    });

    it('it should not login a user with invalid email', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'adminnomad.com', // invalid login email
          password: '123456',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.an('object');
          expect(res.body.payload[0]).to.equal('email must be a valid email');
          done();
        });
    });

    it('it should not login a user with empty password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'admin@nomad.com',
          password: '', // empty login password
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.an('object');
          expect(res.body.payload[0]).to.equal('password is not allowed to be empty');
          done();
        });
    });

    it('it should not login a user with empty email', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: '', // empty login email
          password: '123456',
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.an('object');
          expect(res.body.payload[0]).to.equal('email is not allowed to be empty');
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
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('email or password incorrect');
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
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('email or password incorrect');
          done();
        });
    });
  });
});
