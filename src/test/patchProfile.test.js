import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const profileUrl = '/api/v1/users/profile';

describe('USER CONTROLLER', () => {
  const requester = chai.request(app);

  describe('PATCH USERS PROFILE', () => {
    let token = '';
    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'admin@nomad.com', // valid login details
          password: '123456',
        }).end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('username');
          expect(res.body.payload).to.have.property('firstName');
          expect(res.body.payload).to.have.property('lastName');
          expect(res.body.payload).to.have.property('email');
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
        .patch(profileUrl)
        .set('Authorization', token)
        .send({
          saveProfile: true,
          gender: 'male',
          managerId: 1,
          birthDate: '2008-09-15',
          preferredLanguage: 'French',
          preferredCurrency: 'Dollars',
          homeAddress: 'kdjbbdjbuddjknkn'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('payload');
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('userId');
          expect(res.body.payload).to.have.property('saveProfile');
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

    it('it should return an error status code and error message when invalid fields are given', (done) => {
      chai.request(app)
        .patch(profileUrl)
        .set('authorization', `Bearer ${token}`)
        .send({
          saveProfile: true,
          gender: 'male',
          managerId: 1,
          birthDate: '2008-09-15',
          preferredLanguage: 100,
          preferredCurrency: 'Dollars',
          homeAddress: 'kdjbbdjbuddjknkn'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.message[0]).to.equal('preferredLanguage must be a string');
          done();
        });
    });

    it('it should return an error status code and error message when managerId is not found', (done) => {
      chai.request(app)
        .patch(profileUrl)
        .set('authorization', `Bearer ${token}`)
        .send({
          saveProfile: true,
          firstName: 'John',
          lastName: 'Doe',
          gender: 'male',
          managerId: 100,
          birthDate: '2008-09-15',
          preferredLanguage: 'French',
          preferredCurrency: 'Dollars',
          homeAddress: 'kdjbbdjbuddjknkn'
        })
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.equal('Manager not found');
          done();
        });
    });

    it('it should return an error status code and error message when no token is provided', (done) => {
      chai.request(app)
        .patch(profileUrl)
        .send({
          saveProfile: true,
          gender: 'male',
          managerId: 2,
          birthDate: '2008-09-15',
          preferredLanguage: 'French',
          preferredCurrency: 'Dollars',
          homeAddress: 'kdjbbdjbuddjknkn'
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.equal('Please signin to continue');
          done();
        });
    });

    it('it should return an error status code and error message when invalid token is provided', (done) => {
      chai.request(app)
        .patch(profileUrl)
        .set('authorization', `Bearer ${token}1`)
        .send({
          saveProfile: true,
          gender: 'male',
          managerId: 100,
          birthDate: '2008-09-15',
          preferredLanguage: 'French',
          preferredCurrency: 'Dollars',
          homeAddress: 'kdjbbdjbuddjknkn'
        })
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.equal('Session is invalid. Signin to continue');
          done();
        });
    });
  });
});
