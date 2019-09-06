import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

let token;
describe('FLIGHT DETAILS TEST', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'admin@nomad.com', // valid login details
        password: '123456',
      })
      .end((err, res) => {
        token = res.body.payload.token;
        done();
      });
  });
  it('should add a flight details successfully', (done) => {
    chai.request(app)
      .post('/api/v1/flights/add/2')
      .set('Authorization', token)
      .send({
        airline: 'Air Peace',
        ticketNumber: 'ayw1973037wes22322',
        departureDate: '10-10-2019',
        returnDate: '10-11-2019'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.payload).to.have.a.property('id');
        expect(res.body.payload).to.have.a.property('userId');
        expect(res.body.payload).to.have.a.property('departureDate');
        expect(res.body.payload).to.have.a.property('returnDate');
        expect(res.body.payload).to.have.a.property('ticketNumber');
        expect(res.body.payload).to.have.a.property('airline');
        expect(res.body.payload).to.have.a.property('origin');
        expect(res.body.payload).to.have.a.property('destinationId');
        done();
      });
  });
  it('should return error if returnDate is not specified', (done) => {
    chai.request(app)
      .post('/api/v1/flights/add/2')
      .set('Authorization', token)
      .send({
        airline: 'Air Peace',
        ticketNumber: 'ayw1973037wes22322',
        departureDate: '10-10-2019',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });
  it('should return error if tripId is not found', (done) => {
    chai.request(app)
      .post('/api/v1/flights/add/0')
      .set('Authorization', token)
      .send({
        airline: 'Air Peace',
        ticketNumber: 'ayw1973037wes22322',
        departureDate: '10-10-2019',
        returnDate: '10-11-2019'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });
  it('should return error if not authenticated', (done) => {
    chai.request(app)
      .post('/api/v1/flights/add/1')
      .send({
        airline: 'Air Peace',
        ticketNumber: 'ayw1973037wes22322',
        departureDate: '10-10-2019',
        returnDate: '10-11-2019'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.success).to.be.equal(false);
        done();
      });
  });
});
