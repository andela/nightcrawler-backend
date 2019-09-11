import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
const frequentDestinationUrl = '/api/v1/frequent-destination';

let currentToken;

describe('MOST FREQUENT DESTINATION CONTROLLER', () => {
  before(done => {
    chai
      .request(app)
      .post(signinUrl)
      .send({
        email: 'admin@nomad.com', // Valid Login details
        password: '123456'
      })
      .end((error, res) => {
        currentToken = res.body.payload.token;
        done();
      });
  });
  it('it should get most traveled destination', done => {
    chai
      .request(app)
      .get(`${frequentDestinationUrl}`)
      .set('Authorization', currentToken)
      .end(async (error, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('resource successfully created');
        expect(res.body.payload).to.have.property('maxDestination');


        done();
      });
  });
  it('should return error if no destination is  found', done => {
    chai
      .request(app)
      .get(`${frequentDestinationUrl}for test`)
      .set('Authorization', currentToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });
  it('user cannot obtain most frequent destinations if token is invalid', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const request = chai.request(app).keepOpen();
      await request.post(signinUrl).send(validInput);
      const token = 'dndkcndckdcnlsmlslmcksncjnscnnc';
      const res = await request
        .get(frequentDestinationUrl)
        .set('Authorization', `Bearer ${token}`)
        .send();
      res.body.should.have.property('success').equal(false);
      done();
    })();
  });
  it('user cannot obtain most frequent destination  if token is empty', done => {
    (async () => {
      const validInput = {
        email: 'admin@nomad.com',
        password: '123456'
      };
      const request = chai.request(app).keepOpen();
      await request.post('/api/v1/auth/signin').send(validInput);
      const token = '';
      const res = await request
        .get(frequentDestinationUrl)
        .set('Authorization', `Bearer ${token}`)
        .send();
      res.body.should.have.property('success').equal(false);

      done();
    })();
  });
});
