import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
const permissionsUrl = '/api/v1/permissions';
let currentToken;

describe('PERMISSIONS CONTROLLER', () => {
  describe('CHECK ROUTE PERMISSION', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'alexiwobi@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          currentToken = res.body.payload.token;
          done();
        });
    });

    it('it should not assign role if user is not Super Administrator', (done) => {
      chai.request(app)
        .get(`${permissionsUrl}`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Forbidden Action');
          done();
        });
    });
  });
  describe('VIEW PERMISSIONS', () => {
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
    it('it should view all permissions', (done) => {
      chai.request(app)
        .get(`${permissionsUrl}`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload[0]).to.have.property('id');
          expect(res.body.payload[0]).to.have.property('actionName');
          done();
        });
    });
  });
});
