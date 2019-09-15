import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const searchUrl = '/api/v1/trips/search';

describe('SEARCH TRIP REQUESTS', () => {
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

  it('it should retrieve search result for Lagos', async () => {
    const res = await request
      .get(`${searchUrl}/?key=Lagos`)
      .set('Authorization', token);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should throw an error for empty search key', async () => {
    const res = await request
      .get(`${searchUrl}/?key=''`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for integer search key', async () => {
    const res = await request
      .get(`${searchUrl}/?key=123`)
      .set('Authorization', token);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for empty search key', async () => {
    const res = await request
      .get(`${searchUrl}/?key=`)
      .set('Authorization', token);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for invalid token', async () => {
    const res = await request
      .get(`${searchUrl}/?key=Lagos`)
      .set('Authorization', 'bjebjcbecbjebchbejcbjw');
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});
