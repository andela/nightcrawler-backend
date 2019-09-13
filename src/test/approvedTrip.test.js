import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const approveTripUrl = '/api/v1/trips';

describe('APPROVE TRIP', () => {
  let request;
  let token;
  beforeEach(async () => {
    request = chai.request(app);
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'alexiwobi@nomad.com',
        password: '123456',
      });
    token = res.body.payload.token;
  });

  it('it should approve the trip with valid trip id and send a notification to the requester', async () => {
    const res = await request
      .patch(`${approveTripUrl}/1/approve`)
      .set('Authorization', token);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .patch(`${approveTripUrl}'rr'/approve`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .patch(`${approveTripUrl}/rr/approve`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid route', async () => {
    const res = await request
      .patch(`${approveTripUrl}/approve`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for unknown tripId', async () => {
    const res = await request
      .patch(`${approveTripUrl}/100/approve`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});

describe('GET TRIP', () => {
  let request;
  let token;
  beforeEach(async () => {
    request = chai.request(app);
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'alexiwobi@nomad.com',
        password: '123456',
      });
    token = res.body.payload.token;
  });

  it('it should return the trip object', async () => {
    const res = await request
      .get(`${approveTripUrl}/1`)
      .set('Authorization', token);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return not found', async () => {
    const res = await request
      .get(`${approveTripUrl}/100`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid route', async () => {
    const res = await request
      .patch(`${approveTripUrl}`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .patch(`${approveTripUrl}'rr'`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .patch(`${approveTripUrl}/rr`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});
