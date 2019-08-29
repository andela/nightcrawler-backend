import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
// routes url
const forgotPasswordUrl = '/api/v1/users/forgot-password';
const resetPasswordUrl = '/api/v1/users/reset-forgot-password';
const resetUserPasswordUrl = '/api/v1/users/reset-user-password';

const email = 'johndoe@nomad.com';
const invalidToken = 'hdcbcjdbjchvejckenj';
const oldPassword = '123456';
const unknownEmail = 'gfjfj@nomad.com';
const validPassword = 'johndoe';
const emptyPassword = '';
const invalidEmail = 'adminnomad.com';
const emptyEmail = '';

describe('FORGOT PASSWORD', () => {
  let request;
  beforeEach(async () => {
    request = chai.request(app);
  });

  it('it should send email notification to the user with valid email', async () => {
    const res = await request
      .post(forgotPasswordUrl)
      .send({ email });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.message).to
      .equal('A link has been sent to your email. Kindly follow that link to reset your password');
  });

  it('it should throw an error for unknown email', async () => {
    const res = await request
      .post(forgotPasswordUrl)
      .send({ email: unknownEmail });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for empty email', async () => {
    const res = await request
      .post(forgotPasswordUrl)
      .send({ email: emptyEmail });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for invalid email', async () => {
    const res = await request
      .post(forgotPasswordUrl)
      .send({ email: invalidEmail });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for empty email field', async () => {
    const res = await request
      .post(forgotPasswordUrl)
      .send();
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });
});

describe('RESET USER PASSWORD', () => {
  let request;
  let token;
  beforeEach(async () => {
    request = chai.request(app);
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email, // valid login details
        password: oldPassword,
      });
    token = res.body.payload.token;
  });

  it('it should throw an error for empty old password', async () => {
    const res = await request
      .patch(resetUserPasswordUrl)
      .set('Authorization', token)
      .send({
        oldPassword: emptyPassword,
        newPassword: validPassword
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for empty new password', async () => {
    const res = await request
      .patch(resetUserPasswordUrl)
      .set('Authorization', token)
      .send({
        oldPassword,
        newPassword: emptyPassword
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for no old password field', async () => {
    const res = await request
      .patch(resetUserPasswordUrl)
      .set('Authorization', token)
      .send({
        newPassword: emptyPassword
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for no new password field', async () => {
    const res = await request
      .patch(resetUserPasswordUrl)
      .set('Authorization', token)
      .send({
        oldPassword
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should reset the user password after providing a valid old and new password', async () => {
    const res = await request
      .patch(resetUserPasswordUrl)
      .set('Authorization', token)
      .send({
        oldPassword,
        newPassword: validPassword
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });
});

describe('RESET PASSWORD', () => {
  let request;
  let token;
  beforeEach(async () => {
    request = chai.request(app);
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email, // valid login details
        password: validPassword,
      });
    token = res.body.payload.token;
  });

  it('it should throw an error for empty password', async () => {
    const res = await request
      .patch(resetPasswordUrl)
      .set('Authorization', token)
      .send({
        password: emptyPassword,
        confirmPassword: validPassword
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for empty confirm password', async () => {
    const res = await request
      .patch(resetPasswordUrl)
      .set('Authorization', token)
      .send({
        password: validPassword,
        confirmPassword: emptyPassword
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for only confirm password', async () => {
    const res = await request
      .patch(resetPasswordUrl)
      .set('Authorization', token)
      .send({
        confirmPassword: validPassword
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for empty confirm password field', async () => {
    const res = await request
      .patch(resetPasswordUrl)
      .set('Authorization', token)
      .send({
        password: validPassword,
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for empty request fields', async () => {
    const res = await request
      .patch(resetPasswordUrl)
      .set('Authorization', token)
      .send();
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should throw an error for invalid token', async () => {
    const res = await request
      .patch(resetPasswordUrl)
      .set('Authorization', invalidToken)
      .send({
        password: validPassword,
        confirmPassword: validPassword
      });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
    expect(res.body.message).to.equal('Session is invalid. Signin to continue');
  });

  it('it should throw an error for empty token', async () => {
    const res = await request
      .patch(resetPasswordUrl)
      .set('Authorization', '')
      .send({
        password: validPassword,
        confirmPassword: validPassword
      });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('payload');
  });

  it('it should reset user password with valid password and password', async () => {
    const res = await request
      .patch(resetPasswordUrl)
      .set('Authorization', token)
      .send({
        password: validPassword,
        confirmPassword: validPassword
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('password has been reset successfully');
    expect(res.body).to.have.property('payload');
  });
});
