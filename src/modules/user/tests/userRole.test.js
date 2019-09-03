import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
const userUrl = '/api/v1/users';
let currentToken;

describe('USER CONTROLLER', () => {
  describe('CHECK ROUTE PERMISSION', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'johndoe@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          currentToken = res.body.payload.token;
          done();
        });
    });

    it('it should not assign role if user is not Super Administrator', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/4`)
        .send({ email: 'johndoe@nomad.com' }) // valid email
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Forbidden Action');
          done();
        });
    });
  });
  describe('POST EDIT USER ROLE ', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'admin@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          currentToken = res.body.payload.token;
          done();
        });
    });
    it('it should assign role to user', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/4`)
        .send({ email: 'johndoe@nomad.com' })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('username');
          expect(res.body.payload).to.have.property('firstName');
          expect(res.body.payload).to.have.property('lastName');
          expect(res.body.payload).to.have.property('email');
          expect(res.body.payload).to.have.property('isVerified');
          expect(res.body.payload).to.have.property('profileImage');
          expect(res.body.payload).to.have.property('roleId');
          expect(res.body.payload.roleId).to.equal(4);
          expect(res.body.payload).to.have.property('createdAt');
          expect(res.body.payload).to.have.property('updatedAt');
          done();
        });
    });

    it('it should not assign user if roleId is invalid', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/77`) // valid role id is between 1 - 6 inclusive
        .send({ email: 'johndoe@nomad.com' })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('roleId must be less than or equal to 6');
          done();
        });
    });

    it('it should not assign user if email is invalid', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/4`)
        .send({ email: 'johndoenomad.com' }) // invalid email
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('email must be a valid email');
          done();
        });
    });

    it('it should not assign user if user already belong to that role', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/4`)
        .send({ email: 'johndoe@nomad.com' })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('user already belongs to this role');
          done();
        });
    });

    it('it should not assign user if user does not exist in database', (done) => {
      chai.request(app)
        .patch(`${userUrl}/roles/4`)
        .send({ email: 'shonubijerry@nomad.com' })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('resource with email shonubijerry@nomad.com not found');
          done();
        });
    });
  });
});
