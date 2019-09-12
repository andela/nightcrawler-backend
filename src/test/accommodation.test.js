/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
const accommodationUrl = '/api/v1/accommodations';
let currentToken;

describe('ACCOMMODATION CONTROLLER', () => {
  describe('POST ACCOMMODATION', () => {
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
    it('it should create an accommodation', (done) => {
      chai.request(app)
        .post(`${accommodationUrl}`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('name', 'Eko Hotel')
        .field('country', 'Nigeria')
        .field('city', 'Lagos')
        .field('address', 'Plot 52, Kofo Abayomi Street, Victoria Island, Lagos, Nigeria')
        .field('description', 'Eko Hotel is the main building on our property and it houses most of the attractive features which Eko Hotels & Suites has become known for.These include 447 ...')
        .field('facilities', ['Free WIfi', 'Parking'])
        .field('type', ['Hotel', 'Inn'])
        .attach('images', fs.readFileSync(path.join(__dirname, '/mockData/mock-inn.jpg')), 'mock-inn.jpg')
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.have.property('name');
          expect(res.body.payload).to.have.property('country');
          expect(res.body.payload).to.have.property('city');
          expect(res.body.payload).to.have.property('address');
          expect(res.body.payload).to.have.property('description');
          expect(res.body.payload.facilities).to.be.an('array');
          done();
        });
    });

    it('it should return error if request is empty', (done) => {
      chai.request(app)
        .post(`${accommodationUrl}`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('name is required');
          done();
        });
    });

    it('it should return error if country is not valid', (done) => {
      chai.request(app)
        .post(`${accommodationUrl}`)
        .send({
          name: 'Eko Hotel',
          country: 'Nigeri',
          city: 'Lagos',
          address: 'Plot 52, Kofo Abayomi Street, Victoria Island, Lagos, Nigeria',
          description: 'Eko Hotel is the main building on our property and it houses most of the attractive features which Eko Hotels & Suites has become known for.These include 447 ...',
          facilities: ['Free WIfi', 'Parking'],
          type: ['Hotel', 'Inn']
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('enter a valid country');
          done();
        });
    });
  });

  describe('POST ROOM', () => {
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
    it('it should create a room', (done) => {
      chai.request(app)
        .post(`${accommodationUrl}/rooms/1`)
        .send({
          name: 'Master Bedroom',
          type: 'single'
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.have.property('name');
          expect(res.body.payload).to.have.property('type');
          expect(res.body.payload).to.have.property('accommodationId');
          done();
        });
    });

    it('it should return error if name empty', (done) => {
      chai.request(app)
        .post(`${accommodationUrl}/rooms/1`)
        .send({
          name: '', // empty name
          type: 'single'
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('name is not allowed to be empty');
          done();
        });
    });

    it('it should return error if type empty', (done) => {
      chai.request(app)
        .post(`${accommodationUrl}/rooms/1`)
        .send({
          name: 'Master Bedroom',
          type: ''
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('type is not allowed to be empty');
          done();
        });
    });

    it('it should return error if request accommodationId param is not integer', (done) => {
      chai.request(app)
        .post(`${accommodationUrl}/rooms/1d`)
        .send({
          name: 'Master Bedroom',
          type: 'Single'
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('accommodationId must be a number');
          done();
        });
    });

    it('it should return error if accommodationId does not exist', (done) => {
      chai.request(app)
        .post(`${accommodationUrl}/rooms/22`)
        .send({
          name: 'Master Bedroom',
          type: 'Single'
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('accommodation does not exist');
          done();
        });
    });
  });

  describe('VIEW ACCOMMODATIONS ', () => {
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

    it('it should get all accommodations', (done) => {
      chai.request(app)
        .get(`${accommodationUrl}`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload[0]).to.have.property('name');
          expect(res.body.payload[0]).to.have.property('country');
          expect(res.body.payload[0]).to.have.property('city');
          expect(res.body.payload[0]).to.have.property('address');
          expect(res.body.payload[0]).to.have.property('description');
          done();
        });
    });

    it('it should get filtered accommodations by city', (done) => {
      chai.request(app)
        .get(`${accommodationUrl}?city=Lagos`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload[0]).to.have.property('name');
          expect(res.body.payload[0]).to.have.property('country');
          expect(res.body.payload[0]).to.have.property('city');
          expect(res.body.payload[0]).to.have.property('address');
          expect(res.body.payload[0]).to.have.property('description');
          done();
        });
    });

    it('it should get an accommodations', (done) => {
      chai.request(app)
        .get(`${accommodationUrl}/1`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.have.property('name');
          expect(res.body.payload).to.have.property('country');
          expect(res.body.payload).to.have.property('city');
          expect(res.body.payload).to.have.property('address');
          expect(res.body.payload).to.have.property('description');
          expect(res.body.payload.facilities).to.be.an('array');
          expect(res.body.payload.rooms).to.be.an('array');
          done();
        });
    });

    it('it should get accommodations for a specific trip', (done) => {
      chai.request(app)
        .get(`${accommodationUrl}/trips/2`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload[0]).to.have.property('name');
          expect(res.body.payload[0]).to.have.property('country');
          expect(res.body.payload[0]).to.have.property('city');
          expect(res.body.payload[0]).to.have.property('address');
          expect(res.body.payload[0]).to.have.property('description');
          done();
        });
    });

    it('it should return error if accommodationId does not exist', (done) => {
      chai.request(app)
        .get(`${accommodationUrl}/22`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('resource not found');
          done();
        });
    });

    it('it should return error if accommodationId is invalid', (done) => {
      chai.request(app)
        .get(`${accommodationUrl}/a2`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('it should return error if tripId is invalid', (done) => {
      chai.request(app)
        .get(`${accommodationUrl}/trips/a2`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });
});
