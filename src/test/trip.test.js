import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for one-way trip request endpoint', () => {
  it('user can make trip request if he is logged in and has a valid token', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const data = {
        origin: 'Lagos',
        destinationId: 3,
        reason: 'kckcmlcm',
        departureDate: '05-09-2019',
        accomodationId: '1',
        type: 'one-way',
        returnDate: '02-10-2019'
      };
      const request = chai.request(app).keepOpen();
      const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
      const { token } = signResponse.body.payload;
      const res = await request.post('/api/v1/trips/oneway').set('Authorization', `Bearer ${token}`).send(data);
      res.body.should.have.property('success').equal(true);
      res.should.have.status(201);
      done();
    })();
  });
  
  it('user cannot  make trips request if origin is missing', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const data = {
        origin: '',
        destinationId: 3,
        reason: 'kckcmlcm',
        departureDate: '05-08-2019',
        accomodationId: '1',
        type: 'one-way',
        returnDate: '05-09-2019'
      };
      const request = chai.request(app).keepOpen();
      const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
      const { token } = signResponse.body.payload;
      const res = await request.post('/api/v1/trips/oneway').set('Authorization', `Bearer ${token}`).send(data);
      res.body.should.have.property('success').equal(false);
    
      done();
    })();
  });

  it('user cannot  make trip request if destination is missing', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const data = {
        origin: 'Lagos',
        destinationId: '',
        reason: 'kckcmlcm',
        departureDate: '',
        accomodationId: 1,
        type: 'one-way',
        returnDate: '6363ydd'
      };
      const request = chai.request(app).keepOpen();
      const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
      const { token } = signResponse.body.payload;
      const res = await request.post('/api/v1/trips/oneway').set('Authorization', `Bearer ${token}`).send(data);
      res.body.should.have.property('success').equal(false);
      
      done();
    })();
  });

  it('user cannot make a trip request if token is empty', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const data = {
        origin: 'Lagos',
        destinationId: 3,
        reason: 'kckcmlcm',
        departureDate: '05-09-2019',
        accomodationId: 1,
        type: 'one-way',
        returnDate: '12-12-2020'
      };
      const request = chai.request(app).keepOpen();
      await request.post('/api/v1/auth/signin').send(validInput);
      const token = '';
      const res = await request.post('/api/v1/trips/oneway').set('Authorization', `Bearer ${token}`).send(data);
      res.body.should.have.property('success').equal(false);
     
      done();
    })();
  });

  it('user cannot make a trip request if token is invalid', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const data = {
        origin: 'Lagos',
        destinationId: 3,
        reason: 'kckcmlcm',
        departureDate: '05-09-2019',
        accomodationId: 1,
        type: 'one-way',
        returnDate: '12-12-2019'
      };
      const request = chai.request(app).keepOpen();
      await request.post('/api/v1/auth/signin').send(validInput);
      const token = 'dndkcndckdcnlsmlslmcksncjnscnnc';
      const res = await request.post('/api/v1/trips/oneway').set('Authorization', `Bearer ${token}`).send(data);
      res.body.should.have.property('success').equal(false);
      done();
    })();
  });  
});

let token;
describe('USER RETURN TRIP ROUTE', () => {
  describe('Test User Return Trip', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'admin@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          token = res.body.payload.token;
          done();
        });
    });
    it('Should create trip request if user is logged in and input complete data', (done) => {
      chai.request(app)
        .post('/api/v1/trips/return')
        .set('Authorization', token)
        .send({
          origin: 'Lagos',
          destinationId: 1,
          reason: 'Vacation',
          departureDate: '12-12-2019',
          returnDate: '12-02-2020',
          accomodationId: 1,
          type: 'return',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Request Successful');
          done();
        });
    });
    it('Should return error if return date is not specified', (done) => {
      chai.request(app)
        .post('/api/v1/trips/return')
        .set('Authorization', token)
        .send({
          origin: 'Lagos',
          destinationId: 1,
          reason: 'Vacation',
          departureDate: '12-12-2019',
          accomodationId: 1,
          type: 'return',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('Should return error if return date is before departure', (done) => {
      chai.request(app)
        .post('/api/v1/trips/return')
        .set('Authorization', token)
        .send({
          origin: 'Lagos',
          destinationId: 1,
          reason: 'Vacation',
          departureDate: '12-12-2019',
          returnDate: '12-01-2018',
          accomodationId: 1,
          type: 'return',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });
});