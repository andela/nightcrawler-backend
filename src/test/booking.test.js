/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
const bookingUrl = '/api/v1/bookings';
let currentToken;

describe('BOOKING CONTROLLER', () => {
  describe('POST BOOKING', () => {
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
    it('it should create an booking', (done) => {
      chai.request(app)
        .post(`${bookingUrl}`)
        .send({
          accommodationId: 1,
          tripId: 1,
          adults: 2,
          children: 0,
          checkIn: '2019-09-09T00:09:31.812Z',
          checkOut: '2019-09-09T00:09:31.812Z'
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('resource successfully created');
          done();
        });
    });

    it('it should return error if accommodationId is invalid', (done) => {
      chai.request(app)
        .post(`${bookingUrl}`)
        .set('Authorization', currentToken)
        .send({
          tripId: 1,
          adults: 2,
          children: 0,
          checkIn: '2019-09-09T00:09:31.812Z',
          checkOut: '2019-09-19T00:09:31.812Z'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('accommodationId is required');
          done();
        });
    });

    it('it should return error if checkout date is behind checkin date', (done) => {
      chai.request(app)
        .post(`${bookingUrl}`)
        .set('Authorization', currentToken)
        .send({
          accommodationId: 1,
          tripId: 1,
          adults: 2,
          children: 0,
          checkIn: '2019-09-09T00:09:31.812Z',
          checkOut: '2019-08-03T00:09:31.812Z'
        })
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('it should return error if request is empty', (done) => {
      chai.request(app)
        .post(`${bookingUrl}`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('tripId is required');
          done();
        });
    });

    it('it should return error if tripId does not exist', (done) => {
      chai.request(app)
        .post(`${bookingUrl}`)
        .send({
          accommodationId: 1,
          tripId: 122,
          adults: 2,
          children: 0,
          checkIn: '2019-09-09T00:09:31.812Z',
          checkOut: '2019-09-19T00:09:31.812Z'
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('trip not found');
          done();
        });
    });

    it('it should return error if trip is not approved', (done) => {
      chai.request(app)
        .post(`${bookingUrl}`)
        .send({
          accommodationId: 1,
          tripId: 3,
          adults: 2,
          children: 0,
          checkIn: '2019-09-09T00:09:31.812Z',
          checkOut: '2019-09-19T00:09:31.812Z'
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('trip has not been approved');
          done();
        });
    });

    it('it should return error if accommodationId does not exist', (done) => {
      chai.request(app)
        .post(`${bookingUrl}`)
        .send({
          accommodationId: 99,
          tripId: 1,
          adults: 2,
          children: 0,
          checkIn: '2019-09-09T00:09:31.812Z',
          checkOut: '2019-09-19T00:09:31.812Z'
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('accommodation not found');
          done();
        });
    });
  });

  describe('VIEW BOOKINGS ', () => {
    describe('VIEW USER BOOKINGS ', () => {
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
      it('it should get all requester\'s bookings', (done) => {
        chai.request(app)
          .get(`${bookingUrl}`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('resource successfully fetched');
            done();
          });
      });
    });

    describe('VIEW ALL BOOKINGS', () => {
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
      it('it should get all bookings if role is not requester', (done) => {
        chai.request(app)
          .get(`${bookingUrl}`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('resource successfully fetched');
            done();
          });
      });
    });

    describe('VIEW USER BOOKINGS', () => {
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
      it('it should get all bookings if role is not requester', (done) => {
        chai.request(app)
          .get(`${bookingUrl}/user`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.message).to.equal('resource successfully fetched');
            done();
          });
      });
    });
  });

  describe('VIEW A SPECIFIC BOOKING', () => {
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

    it('it should get a specific booking', (done) => {
      chai.request(app)
        .get(`${bookingUrl}/1`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('resource successfully fetched');
          done();
        });
    });

    it('it should return error if bookingId is invalid', (done) => {
      chai.request(app)
        .get(`${bookingUrl}/dhd`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('bookingId must be a number');
          done();
        });
    });

    it('it should return error if bookingId does not exist', (done) => {
      chai.request(app)
        .get(`${bookingUrl}/222`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('resource not found');
          done();
        });
    });
  });
});
