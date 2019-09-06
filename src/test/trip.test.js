import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
describe('Testing for one-way trip request endpoint', () => {
  // this.timeout(15000);
  it('user can make trip request if he is logged in and has a valid token', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const data = {
        origin: 'Lagos',
        destination: 'Abj',
        reason: 'kckcmlcm',
        departureDate: '52555353553',
        accomodationId: '1',
        type: 'one-way',
        returnDate: '6363ydd'
      };
      const request = chai.request(app).keepOpen();
      const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
      const { token } = signResponse.body.payload;
      const res = await request.post('/api/v1/trip/request').set('Authorization', `Bearer ${token}`).send(data);
      res.body.should.have.property('success').equal(true);
      res.should.have.status(201);
      done();
    })();
  });

  it('user cannot  make trip request if origin is missing', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const data = {
        origin: '',
        destination: 'Abj',
        reason: 'kckcmlcm',
        departureDate: '52555353553',
        accomodationId: '1',
        type: 'one-way',
        returnDate: '6363ydd'
      };
      const request = chai.request(app).keepOpen();
      const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
      const { token } = signResponse.body.payload;
      const res = await request.post('/api/v1/trip/request').set('Authorization', `Bearer ${token}`).send(data);
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
        destination: '',
        reason: 'kckcmlcm',
        departureDate: '52555353553',
        accomodationId: '1',
        type: 'one-way',
        returnDate: '6363ydd'
      };
      const request = chai.request(app).keepOpen();
      const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
      const { token } = signResponse.body.payload;
      const res = await request.post('/api/v1/trip/request').set('Authorization', `Bearer ${token}`).send(data);
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
        destination: 'Abj',
        reason: 'kckcmlcm',
        departureDate: '52555353553',
        accomodationId: '1',
        type: 'one-way',
        returnDate: '12-12-2019'
      };
      const request = chai.request(app).keepOpen();
      await request.post('/api/v1/auth/signin').send(validInput);
      const token = '';
      const res = await request.post('/api/v1/trip/request').set('Authorization', `Bearer ${token}`).send(data);
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
        destination: 'Abj',
        reason: 'kckcmlcm',
        departureDate: '52555353553',
        accomodationId: '1',
        type: 'one-way',
        returnDate: '12-12-2019'
      };
      const request = chai.request(app).keepOpen();
      await request.post('/api/v1/auth/signin').send(validInput);
      const token = 'dndkcndckdcnlsmlslmcksncjnscnnc';
      const res = await request.post('/api/v1/trip/request').set('Authorization', `Bearer ${token}`).send(data);
      res.body.should.have.property('success').equal(false);

      done();
    })();
  });
});
