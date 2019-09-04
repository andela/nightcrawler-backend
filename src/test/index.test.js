import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
const userUrl = '/api/v1/users';

describe('DEFAULT TESTS', () => {
  describe('Authentication', () => {
    it('it should return authentication error', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'aubameyang@nomad.com', // invalid login details
          password: '123456',
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Incorrect email');
          done();
        });
    });

    it('it should not access route if token is not provided', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/2`) // valid role id is between 1 - 6 inclusive
        .send({ email: 'johndoe@nomad.com' })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Please signin to continue');
          done();
        });
    });
  });

  describe('Expired session', () => {
    it('it Return session expired for a user', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/4`)
        .send({ email: 'shonubijerry@nomad.com' })
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOnsiaWQiOjEsInJvbGVJZCI6MX0sImlhdCI6MTU2NzE4NzMwNSwiZXhwIjoxNTY3MTg3MzA4fQ.TXFOAeu71-nOk_7SYG1IFfUdaw2EJeNT-zjScuXSYro')
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Session has expired. Signin to continue');
          done();
        });
    });

    it('it Return session is invalid for a user', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/4`)
        .send({ email: 'shonubijerry@nomad.com' })
        .set('Authorization', 'Bearer invalid_session_token')
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Session is invalid. Signin to continue');
          done();
        });
    });
  });
  describe('Routes', () => {
    it('it should return route not found', (done) => {
      chai.request(app)
        .get('/nonexisting_route')
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('route not found');
          done();
        });
    });
    it('it should test index route', (done) => {
      chai.request(app)
        .get('/')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Welcome to barefoot Normad');
          done();
        });
    });
  });
});
