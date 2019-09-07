import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const logoutUrl = '/api/v1/auth/logout';

describe('USER CONTROLLER', () => {
  describe('GET LOG OUT', () => {
    it('it should logout a user with a response indication successful logout', done => {
      chai
        .request(app)
        .get(logoutUrl)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.equal('Successfully Logged out');
          done();
        });
    });
  });
});
