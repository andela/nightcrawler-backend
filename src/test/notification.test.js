import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
describe('Testing marking all notification endpoint', () => {
  
  it('user if he is logged in and has a valid token should mark all notification as read', done => {
    (async () => {
      const validInput = {
        email: 'johndoe@nomad.com',
        password: '123456'
      };
    
      const request = chai.request(app).keepOpen();
      const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
      const { token } = signResponse.body.payload;
      const res = await request.patch('/api/v1/notifications/readAll').set('Authorization', `Bearer ${token}`).send();
      res.body.should.have.property('success').equal(true);
      res.should.have.status(200);
      done();
    })();
  });

 it('user cannot make notification if token is empty', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const request = chai.request(app).keepOpen();
      await request.post('/api/v1/auth/signin').send(validInput);
      const token = '';
      const res = await request.patch('/api/v1/notifications/readAll').set('Authorization', `Bearer ${token}`).send();
      res.body.should.have.property('success').equal(false);

      done();
    })();
  });

  it('user cannot mark all notification if token is invalid', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const request = chai.request(app).keepOpen();
      await request.post('/api/v1/auth/signin').send(validInput);
      const token = 'dndkcndckdcnlsmlslmcksncjnscnnc';
      const res = await request.patch('/api/v1/notifications/readAll').set('Authorization', `Bearer ${token}`).send();
      res.body.should.have.property('success').equal(false);
      done();
    })();
  });  
});