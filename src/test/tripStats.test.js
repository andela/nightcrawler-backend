import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const statsUrl = '/api/v1/trips/stats';
const loginUrl = '/api/v1/auth/signin';

const admin = {
  email: 'admin@nomad.com',
  password: '123456',
};

const supplier = {
  email: 'marcus@nomad.com',
  password: '123456',
};

const date = {
  date: '2019-09-01'
};

let supplierToken;
let adminToken;

describe('Trip stats tests', () => {
  before(async () => {
    await chai.request(app)
      .post(loginUrl)
      .send(supplier)
      .then((res) => {
        supplierToken = res.body.payload.token;
        expect(res.status).to.equal(200);
      });
    await chai.request(app)
      .post(loginUrl)
      .send(admin)
      .then((res) => {
        adminToken = res.body.payload.token;
        expect(res.status).to.equal(200);
      });
  });

  describe('Unauthenticated user cannot get trip stats', () => {
    it('should respond with unauthenticated error', (done) => {
      chai.request(app)
        .post(statsUrl)
        .send(date)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });

  describe('Unauthorized user cannot get trip stats', () => {
    it('should respond with forbidden error', (done) => {
      chai.request(app)
        .post(statsUrl)
        .set('Authorization', supplierToken)
        .send(date)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });

  describe('Can get trip stats', () => {
    it('should respond with status 200 and date data', (done) => {
      chai.request(app)
        .post(statsUrl)
        .set('Authorization', adminToken)
        .send(date)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('success', true);
          done();
        });
    });
  });

  describe('Cannot get trip stats invalid data', () => {
    describe('Cannot create record with invalid date', () => {
      it('should respond with error for empty field', (done) => {
        chai.request(app)
          .post(statsUrl)
          .set('Authorization', adminToken)
          .send({
            date: '',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for invalid date', (done) => {
        chai.request(app)
          .post(statsUrl)
          .set('Authorization', adminToken)
          .send({
            date: 'hello',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for white spaces', (done) => {
        chai.request(app)
          .post(statsUrl)
          .set('Authorization', adminToken)
          .send({
            date: '         ',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
  });
});
