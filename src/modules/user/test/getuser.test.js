import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const profileUrl = '/api/v1/user/profile';

describe('USER CONTROLLER', () => {
  describe('GET USERS PROFILE', () => {
    const requester = chai.request(app).keepOpen();
    let token = '';
    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'admin@nomad.com', // valid login details
          password: '123456',
        }).end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.a('object');
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('username');
          expect(res.body.payload).to.have.property('companyId');
          expect(res.body.payload).to.have.property('email');
          expect(res.body.payload).to.have.property('emailVerifiedAt');
          expect(res.body.payload).to.have.property('token');
          expect(res.body.payload).to.have.property('profileImage');
          expect(res.body.payload).to.have.property('roleId');
          expect(res.body.payload).to.have.property('createdAt');
          expect(res.body.payload).to.have.property('updatedAt');
          // eslint-disable-next-line prefer-destructuring
          token = res.body.payload.token;
          done();
        });
    });

    it('it should return a success status code and user profile data', (done) => {
      chai.request(app)
        .post(profileUrl)
        .set('token', token)
        .send({
          saveProfile: true,
          firstName: 'man',
          lastName: 'tommy',
          gender: 'male',
          managerId: 2,
          birthDate: '12/2/1992',
          preferredLanguage: 'French',
          preferredCurrency: 'Dollars',
          homeAddress: 'kdjbbdjbuddjknkn'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.a('object');
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('userId');
          expect(res.body.payload).to.have.property('saveProfile');
          expect(res.body.payload).to.have.property('firstName');
          expect(res.body.payload).to.have.property('lastName');
          expect(res.body.payload).to.have.property('gender');
          expect(res.body.payload).to.have.property('managerId');
          expect(res.body.payload).to.have.property('birthDate');
          expect(res.body.payload).to.have.property('preferredLanguage');
          expect(res.body.payload).to.have.property('preferredCurrency');
          expect(res.body.payload).to.have.property('homeAddress');
          expect(res.body.payload).to.have.property('createdAt');
          expect(res.body.payload).to.have.property('updatedAt');
          done();
        });
    });

    it('it should return a success status code, when a valid token is provided', (done) => {
      chai.request(app)
        .get(profileUrl)
        .set('token', token)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.be.a('object');
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('userId');
          expect(res.body.payload).to.have.property('saveProfile');
          expect(res.body.payload).to.have.property('firstName');
          expect(res.body.payload).to.have.property('lastName');
          expect(res.body.payload).to.have.property('gender');
          expect(res.body.payload).to.have.property('managerId');
          expect(res.body.payload).to.have.property('birthDate');
          expect(res.body.payload).to.have.property('preferredLanguage');
          expect(res.body.payload).to.have.property('preferredCurrency');
          expect(res.body.payload).to.have.property('homeAddress');
          expect(res.body.payload).to.have.property('createdAt');
          expect(res.body.payload).to.have.property('updatedAt');
          done();
        });
    });

    it('it should return an error status code and error message when no token is provided', (done) => {
      chai.request(app)
        .get(profileUrl)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.be.an('array');
          done();
        });
    });

    it('it should return an error status code and error message when invalid token is provided', (done) => {
      chai.request(app)
        .get(profileUrl)
        .set('token', token + 1)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.be.an('array');
          done();
        });
    });
  });
});
