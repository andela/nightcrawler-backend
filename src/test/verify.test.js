// eslint-disable-next-line no-unused-vars
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const loginUrl = '/api/v1/auth/signin';
const verifyUrl = '/api/v1/users/verify';

chai.use(chaiHttp);

const admin = {
  email: 'admin@nomad.com',
  password: '123456',
};

let adminToken;

describe('Verify user test', () => {
  before(async () => {
    await chai.request(app)
      .post(loginUrl)
      .send(admin)
      .then((res) => {
        adminToken = res.body.payload.token;
        expect(res.status).to.equal(200);
      });
  });
  describe('Cannot verify user with invalid data', () => {
    it('should respond with error for no token supplied', (done) => {
      chai.request(app)
        .post(verifyUrl)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
    it('should respond with error for invalid token supplied', (done) => {
      chai.request(app)
        .post(verifyUrl)
        .send({ token: 'thisIsAnInvalidToken123456' })
        .end((err, res) => {
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });
  describe('Can verify user account', () => {
    it('should respond with status 201 and user data', (done) => {
      chai.request(app)
        .post(verifyUrl)
        .set('Authorization', adminToken)
        .send({ token: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('success', true);
          done();
        });
    });
  });
  describe('Cannot verify an already verified user', () => {
    it('should respond with error', (done) => {
      chai.request(app)
        .post(verifyUrl)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });
});
