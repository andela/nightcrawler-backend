/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
let currentToken;


describe('MULTI-CITY TRIP REQUEST', () => {
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

  it('user can make multi-city trip request', (done) => {
    const data = {
      origin: 'Lagos',
      destinationId: 2,
      reason: 'Meet CEO',
      departureDate: new Date(),
      type: 'multi-city',
      subRequest: [
        {
          subOrigin: 'Lagos',
          subDestinationId: 6,
          subDepartureDate: '2019-10-09T00:09:31.812Z',
          subReason: 'Meet CEO'
        },
        {
          subOrigin: 'Kampala',
          subDestinationId: 5,
          subDepartureDate: '2019-11-09T00:09:31.812Z',
          subReason: 'Meeting with top company clients'
        }
      ]
    };
    chai.request(app)
      .post('/api/v1/trips/multicity')
      .set('Authorization', currentToken)
      .send(data)
      .end((error, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('request successfully sent');
        done();
      });
  });

  it('it should return error if request is empty', (done) => {
    chai.request(app)
      .post('/api/v1/trips/multicity')
      .set('Authorization', currentToken)
      .send({})
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message[0]).to.equal('origin is required');
        done();
      });
  });

  it('it should return error if subRequest is empty', (done) => {
    const data = {
      origin: 'Lagos',
      destinationId: 2,
      reason: 'Meet CEO',
      departureDate: new Date(),
      type: 'multi-city',
    };
    chai.request(app)
      .post('/api/v1/trips/multicity')
      .set('Authorization', currentToken)
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message[0]).to.equal('subRequest is required');
        done();
      });
  });
});

describe('GET TRIPS', () => {
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

  it('it should return all trips', done => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('Authorization', currentToken)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        done();
      });
  });
});
