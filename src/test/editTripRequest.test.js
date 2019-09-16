import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for edit trip request endpoint', () => {
    it('user can edit trip request if he is logged in and has a valid token', done => {
      (async () => {
        const validInput = {
          email: 'johndoe@nomad.com',
          password: '123456'
        };
        const data = {
          destinationId: 3,
          reason: 'I want to tour the world',
          departureDate: '05-09-2019',
          type:"one-way"
        
        };
        const request = chai.request(app).keepOpen();
        const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
        const { token } = signResponse.body.payload;
        console.log(token)
        const res = await request.patch('/api/v1/trips/3/edit').set('Authorization', `Bearer ${token}`).send(data);
        res.body.should.have.property('success').equal(true);
        res.should.have.status(200);
        done();
      })();
    });
 
    
  
    it('user cannot edit a trip request if token is empty', done => {
      (async () => {
        const validInput = {
          email: 'admin@nomad.com',
          password: '123456'
        };

        const data = {
            destinationId: 3,
            reason: 'I want to tour the world',
            departureDate: '05-09-2019',
            type:"one-way",
          
          };
       
        const request = chai.request(app).keepOpen();
        await request.post('/api/v1/auth/signin').send(validInput);
        const token = '';
        const res = await request.patch('/api/v1/trips/3/edit').set('Authorization', `Bearer ${token}`).send(data);
        res.body.should.have.property('success').equal(false);
       
        done();
      })();
    });
  
    it('user cannot edit a trip request if token is invalid', done => {
      (async () => {
        const validInput = {
          email: 'admin@nomad.com',
          password: '123456'
        };
        const data = {
           destinationId: 2,
            reason: 'I want to tour the world',
            departureDate: '05-09-2019',
            type:"one-way"
          
          };
        const request = chai.request(app).keepOpen();
        await request.post('/api/v1/auth/signin').send(validInput);
        const token = 'dndkcndckdcnlsmlslmcksncjnscnnc';
        const res = await request.patch('/api/v1/trips/3/edit').set('Authorization', `Bearer ${token}`).send(data);
        res.body.should.have.property('success').equal(false);
        done();
      })();
    });  


    it('user cannot edit trip request if tripId is invalid', done => {
        (async () => {
          const validInput = {
            email: 'johndoe@nomad.com',
            password: '123456'
          };
          const data = {
            destinationId: 3,
            reason: 'I want to tour the world',
            departureDate: '05-09-2019',
            type:"multi-city"
          
          };
          const request = chai.request(app).keepOpen();
          const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
          const { token } = signResponse.body.payload;
          const res = await request.patch('/api/v1/trips/r/edit').set('Authorization', `Bearer ${token}`).send(data);
          res.body.should.have.property('success').equal(false);
          done();
        })();
      }); 


      it('user cannot edit trip request if tripId is does not exist', done => {
        (async () => {
          const validInput = {
            email: 'johndoe@nomad.com',
            password: '123456'
          };
          const data = {
            origin: 'Australia',
            destinationId: 3,
            reason: 'I want to tour the world',
            departureDate: '05-09-2019',
          
          };
          const request = chai.request(app).keepOpen();
          const signResponse = await request.post('/api/v1/auth/signin').send(validInput);
          const { token } = signResponse.body.payload;
          const res = await request.patch('/api/v1/trips/10000/edit').set('Authorization', `Bearer ${token}`).send(data);
          res.body.should.have.property('success').equal(false);
          done();
        })();
      });
  });