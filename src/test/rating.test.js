import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const ratingUrl = '/api/v1/accommodations';

describe('POST ACCOMMODATION RATING', () => {
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

  it('it should post a rating for an accommodation', async () => {
    const res = await request
      .post(`${ratingUrl}/1/rating`)
      .set('Authorization', token)
      .send({ rating: 5 });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return an error for empty rating', async () => {
    const res = await request
      .post(`${ratingUrl}/1/rating`)
      .set('Authorization', token)
      .send({ rating: '' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for empty rating field', async () => {
    const res = await request
      .post(`${ratingUrl}/1/rating`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for empty token', async () => {
    const res = await request
      .post(`${ratingUrl}/1/rating`)
      .send({ rating: 5 });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid token', async () => {
    const res = await request
      .post(`${ratingUrl}/1/rating`)
      .set('Authorization', 'jcbjebcekbcjebcjebkcebk')
      .send({ rating: 5 });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid accommodation id', async () => {
    const res = await request
      .post(`${ratingUrl}/100/rating`)
      .set('Authorization', token)
      .send({ rating: 5 });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid accommodation id params', async () => {
    const res = await request
      .post(`${ratingUrl}/'1'/rating`)
      .set('Authorization', token)
      .send({ rating: 5 });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});

describe('GET ACCOMMODATION RATINGS', () => {
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

  it('it should post a rating for an accommodation', async () => {
    const res = await request
      .get(`${ratingUrl}/1/ratings`)
      .set('Authorization', token);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return an error for empty token', async () => {
    const res = await request
      .get(`${ratingUrl}/1/ratings`);
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid token', async () => {
    const res = await request
      .get(`${ratingUrl}/1/ratings`)
      .set('Authorization', 'jcbjebcekbcjebcjebkcebk');
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid accommodation id', async () => {
    const res = await request
      .get(`${ratingUrl}/100/ratings`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid accommodation id params', async () => {
    const res = await request
      .get(`${ratingUrl}/'1'/ratings`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid accommodation id params two', async () => {
    const res = await request
      .get(`${ratingUrl}/rr/ratings`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid accommodation id params two', async () => {
    const res = await request
      .get(`${ratingUrl}/2/ratings`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});
