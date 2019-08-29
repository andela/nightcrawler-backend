import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('SOCIAL MEDIA', () => {
  it('should log in to google', () => {
    chai.request(app)
      .post('/api/v1/auth/google')
      .send({
        username: 'stepheng323@gmail.com',
        password: 'llll'
      })
      .end((err, res) => {
        expect(res.redirect);
      });
  });
  it('should log in to facebook', () => {
    chai.request(app)
      .post('/api/v1/auth/facebook')
      .send({
        username: 'stepheng323@gmail.com',
        password: 'llll'
      })
      .end((err, res) => {
        expect(res.redirect);
      });
  });
});
