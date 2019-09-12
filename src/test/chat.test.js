import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const chatUrl = '/api/v1/chat';
const privateChatUrl = '/api/v1/chats';

describe('POST CHAT', () => {
  let request;
  let token;
  let tokenTwo;
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
        email: 'jammjones@nomad.com',
        password: '123456',
      });
    tokenTwo = resp.body.payload.token;

    const respo = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'marcus@nomad.com',
        password: '123456',
      });
    blockedToken = respo.body.payload.token;
  });

  it('it should post a chat from alex iwobi', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', token)
      .send({
        recipient: 'jammjones@nomad.com',
        sender: 'alexiwobi@nomad.com',
        message: 'Hello there',
      });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should post a chat from john jammy', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', tokenTwo)
      .send({
        recipient: 'alexiwobi@nomad.com',
        sender: 'jammjones@nomad.com',
        message: 'Hello there',
      });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return error for access denied', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', blockedToken)
      .send({
        recipient: 'alexiwobi@nomad.com',
        sender: 'jammjones@nomad.com',
        message: 'Hello there',
      });
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for empty message', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', tokenTwo)
      .send({
        recipient: 'alexiwobi@nomad.com',
        sender: 'jammjones@nomad.com',
        message: '',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for no message field', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', tokenTwo)
      .send({
        recipient: 'alexiwobi@nomad.com',
        sender: 'jammjones@nomad.com',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for empty sender', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', tokenTwo)
      .send({
        recipient: 'alexiwobi@nomad.com',
        sender: '',
        message: 'Hello there',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for no sender field', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', tokenTwo)
      .send({
        recipient: 'alexiwobi@nomad.com',
        message: 'Hello there',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for empty recipient', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', tokenTwo)
      .send({
        recipient: '',
        sender: 'jammjones@nomad.com',
        message: 'Hello there',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for no recipient field', async () => {
    const res = await request
      .post(chatUrl)
      .set('Authorization', tokenTwo)
      .send({
        sender: 'jammjones@nomad.com',
        message: 'Hello there',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});

describe('GET PRIVATE CHATS', () => {
  let request;
  let token;
  let tokenTwo;
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
        email: 'jammjones@nomad.com',
        password: '123456',
      });
    tokenTwo = resp.body.payload.token;

    const respo = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'marcus@nomad.com',
        password: '123456',
      });
    blockedToken = respo.body.payload.token;
  });

  it('it should post a chat from alex iwobi', async () => {
    const res = await request
      .get(`${privateChatUrl}/?sender=alexiwobi@nomad.com&recipient=jammjones@nomad.com`)
      .set('Authorization', token);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should post a chat from john jammy', async () => {
    const res = await request
      .get(`${privateChatUrl}/?sender=jammjones@nomad.com&recipient=alexiwobi@nomad.com`)
      .set('Authorization', tokenTwo)
      .send({
        recipient: 'alexiwobi@nomad.com',
        sender: 'jammjones@nomad.com',
        message: 'Hello there',
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(true);
  });

  it('it should return error for access denied', async () => {
    const res = await request
      .get(`${privateChatUrl}/?sender=jammjones@nomad.com&recipient=alexiwobi@nomad.com`)
      .set('Authorization', blockedToken);
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for empty sender query', async () => {
    const res = await request
      .get(`${privateChatUrl}/?sender=&recipient=alexiwobi@nomad.com`)
      .set('Authorization', tokenTwo);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for no sender query', async () => {
    const res = await request
      .get(`${privateChatUrl}/?recipient=alexiwobi@nomad.com`)
      .set('Authorization', tokenTwo);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for empty recipient', async () => {
    const res = await request
      .get(`${privateChatUrl}/?sender=jammjones@nomad.com&recipient=`)
      .set('Authorization', tokenTwo);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for no recipient query', async () => {
    const res = await request
      .get(`${privateChatUrl}/?sender=jammjones@nomad.com`)
      .set('Authorization', tokenTwo);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });

  it('it should throw an error for no query strings', async () => {
    const res = await request
      .get(`${privateChatUrl}`)
      .set('Authorization', tokenTwo);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.success).to.equal(false);
  });
});
