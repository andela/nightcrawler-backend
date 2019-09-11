import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
const notificationUrl = '/api/v1/notifications';

describe('NOTIFICATION CONTROLLER', () => {
  describe('GET USER NOTIFICATIONS', () => {
    const requester = chai.request(app);
    let token = '';
    let secondToken = '';

    before((done) => {
      requester.post('/api/v1/auth/signin')
        .send({
          email: 'johndoe@nomad.com', // valid login details
          password: '123456',
        }).end((err, res) => {
          // eslint-disable-next-line prefer-destructuring
          token = res.body.payload.token;
        });

      requester.post('/api/v1/auth/signin')
        .send({
          email: 'jammjones@nomad.com', // valid login details
          password: '123456',
        }).end((err, res) => {
          // eslint-disable-next-line prefer-destructuring
          secondToken = res.body.payload.token;
          done();
        });
    });

    it('it should return a success status code and all user notifications', (done) => {
      chai.request(app)
        .get(notificationUrl)
        .set('authorization', token)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success');
          expect(res.body.message).to.equal('success');
          expect(res.body.payload[0]).to.have.property('id');
          expect(res.body.payload[0]).to.have.property('type');
          expect(res.body.payload[0]).to.have.property('title');
          expect(res.body.payload[0]).to.have.property('message');
          expect(res.body.payload[0]).to.have.property('read');
          expect(res.body.payload[0]).to.have.property('tripId');
          expect(res.body.payload[0]).to.have.property('commentId');
          expect(res.body.payload[0]).to.have.property('userId');
          expect(res.body.payload[0]).to.have.property('createdAt');
          expect(res.body.payload[0]).to.have.property('updatedAt');
          done();
        });
    });

    it('it should return a sucess status code and message when no user notification is found', (done) => {
      chai.request(app)
        .get(notificationUrl)
        .set('authorization', secondToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('payload');
          expect(res.body.message).to.equal('You dont have any notifications for now');
          done();
        });
    });

    it('it should return an error status code and error message when no token is provided', (done) => {
      chai.request(app)
        .get(notificationUrl)
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
        .get(notificationUrl)
        .set('authorization', `Bearer ${token}1`)
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
