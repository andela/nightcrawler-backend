import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const approveTripUrl = '/api/v1/trips';

describe('CREATE TRIP COMMENT', () => {
  let request;
  let token;
  let blockedToken;
  beforeEach(async () => {
    request = chai.request(app);
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'alexiwobi@nomad.com',
        password: '123456',
      });
    token = res.body.payload.token;

    const resp = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'marcus@nomad.com',
        password: '123456',
      });
    blockedToken = resp.body.payload.token;
  });

  it('it should create a comment and then send notification to either the manager or the requester', async () => {
    const res = await request
      .post(`${approveTripUrl}/1/comment`)
      .set('Authorization', token)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return an error for access denied', async () => {
    const res = await request
      .post(`${approveTripUrl}/1/comment`)
      .set('Authorization', blockedToken)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .post(`${approveTripUrl}/'rr'/comment`)
      .set('Authorization', token)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .post(`${approveTripUrl}/rr/comment`)
      .set('Authorization', token)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for empty comment', async () => {
    const res = await request
      .post(`${approveTripUrl}/1/comment`)
      .set('Authorization', token)
      .send({ comment: '' });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for empty comment field', async () => {
    const res = await request
      .post(`${approveTripUrl}/1/comment`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for empty token', async () => {
    const res = await request
      .post(`${approveTripUrl}/rr/comment`)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid route', async () => {
    const res = await request
      .post(`${approveTripUrl}/comment`)
      .set('Authorization', token)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for unknown tripId', async () => {
    const res = await request
      .post(`${approveTripUrl}/100/comment`)
      .set('Authorization', token)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});


describe('DELETE TRIP COMMENT', () => {
  let request;
  let token;
  let blockedToken;
  beforeEach(async () => {
    request = chai.request(app);
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'lionelmessi@nomad.com',
        password: '123456',
      });
    token = res.body.payload.token;

    const resp = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'marcus@nomad.com',
        password: '123456',
      });
    blockedToken = resp.body.payload.token;
  });

  it('it should be able to delete comment', async () => {
    const res = await request
      .delete(`${approveTripUrl}/1/comments/1`)
      .set('Authorization', token);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return an error for access denied', async () => {
    const res = await request
      .delete(`${approveTripUrl}/1/comments/1`)
      .set('Authorization', blockedToken);
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .delete(`${approveTripUrl}/'rr'/comments/1`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid commentId', async () => {
    const res = await request
      .delete(`${approveTripUrl}/1/comments/'rr'`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .delete(`${approveTripUrl}/rr/comments/1`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid commentId', async () => {
    const res = await request
      .delete(`${approveTripUrl}/1/comments/rr`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for empty token', async () => {
    const res = await request
      .delete(`${approveTripUrl}/1/comments/1`);
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid route', async () => {
    const res = await request
      .delete(`${approveTripUrl}/1/comment`)
      .set('Authorization', token)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for unknown tripId', async () => {
    const res = await request
      .delete(`${approveTripUrl}/100/comment/1`)
      .set('Authorization', token)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for unknown commentId', async () => {
    const res = await request
      .delete(`${approveTripUrl}/1/comment/1000`)
      .set('Authorization', token)
      .send({ comment: 'Hello guys' });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});

describe('VIEW ALL TRIP COMMENTS', () => {
  let request;
  let token;
  let blockedToken;
  beforeEach(async () => {
    request = chai.request(app);
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'lionelmessi@nomad.com',
        password: '123456',
      });
    token = res.body.payload.token;

    const resp = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'marcus@nomad.com',
        password: '123456',
      });
    blockedToken = resp.body.payload.token;
  });

  it('it should be able to view all comments of a particular trip', async () => {
    const res = await request
      .get(`${approveTripUrl}/1/comments`)
      .set('Authorization', token);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return an error for access denied', async () => {
    const res = await request
      .get(`${approveTripUrl}/1/comments`)
      .set('Authorization', blockedToken);
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .get(`${approveTripUrl}/'rr'/comments`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid tripId', async () => {
    const res = await request
      .get(`${approveTripUrl}/rr/comments`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for empty token', async () => {
    const res = await request
      .get(`${approveTripUrl}/1/comments`);
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for invalid route', async () => {
    const res = await request
      .get(`${approveTripUrl}/1/comment`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for comment not found', async () => {
    const res = await request
      .get(`${approveTripUrl}/2/comment`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should return an error for unknown tripId', async () => {
    const res = await request
      .get(`${approveTripUrl}/100/comments`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});
