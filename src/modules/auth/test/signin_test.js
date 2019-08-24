import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.should();
chai.use(chaiHttp);

describe('Testing for signin endpoint', () => {
  it('User should not signin when email is empty', (done) => {
    const dataVal = {
      email: '',
      password: '123456',
    };
    chai
      .request(app)
      .post('/auth/signin')
      .send(dataVal)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('error');
        done();
      });
  });

  it('User should not signin  when password is empty', (done) => {
    const dataVal = {
      email: 'test@example.com',

      password: '',
    };
    chai
      .request(app)
      .post('/auth/signin')
      .send(dataVal)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('error');
        done();
      });
  });

  it('signin user when all fields are provided', (done) => {
    const dataVal = {
      email: 'test@example.com',
      password: '123456',
    };
    chai
      .request(app)
      .post('/auth/signin')
      .send(dataVal)
      .end((err, res) => {
        res.body.should.have.status('success');
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        done();
      });
  });
});
