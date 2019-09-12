import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const reviewUrl = '/api/v1/accommodations/1/reviews';
const loginUrl = '/api/v1/auth/signin';

const admin = {
  email: 'admin@nomad.com',
  password: '123456',
};

const requester = {
  email: 'johndoe@nomad.com',
  password: '123456',
};

const review = {
  review: 'Good environment. Nice place to stay'
};

let requesterToken;
let adminToken;

describe('Accommodation tests', () => {
  before(async () => {
    await chai.request(app)
      .post(loginUrl)
      .send(requester)
      .then((res) => {
        requesterToken = res.body.payload.token;
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

  describe('Unauthenticated user cannot review an accommodation', () => {
    it('should respond with unauthenticated error', (done) => {
      chai.request(app)
        .post(reviewUrl)
        .send(review)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });

  describe('Unauthorized user cannot review an accommodation', () => {
    it('should respond with forbidden error', (done) => {
      chai.request(app)
        .post(reviewUrl)
        .set('Authorization', adminToken)
        .send(review)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });

  describe('Can review an accommodation', () => {
    it('should respond with status 201 and review data', (done) => {
      chai.request(app)
        .post(reviewUrl)
        .set('Authorization', requesterToken)
        .send(review)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('success', true);
          expect(res.body.payload.review).to.equal(review.review);
          done();
        });
    });
  });

  describe('Unauthenticated user cannot get accommodation reviews', () => {
    it('should respond with unauthenticated error', (done) => {
      chai.request(app)
        .get(reviewUrl)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });

  describe('Can get accommodation reviews', () => {
    describe('admin can get accommodation reviews', () => {
      it('should respond with status 200 and accommodation reviews data', (done) => {
        chai.request(app)
          .get(reviewUrl)
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('success', true);
            done();
          });
      });
    });
  });

  describe('Cannot create accommodation review with invalid data', () => {
    describe('Cannot create record with invalid review', () => {
      it('should respond with error for empty field', (done) => {
        chai.request(app)
          .post(reviewUrl)
          .set('Authorization', requesterToken)
          .send({
            review: '',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for white spaces', (done) => {
        chai.request(app)
          .post(reviewUrl)
          .set('Authorization', requesterToken)
          .send({
            comment: '         ',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
    describe('Cannot create review for non existing accommodation', () => {
      it('should respond with 404 error', (done) => {
        chai.request(app)
          .post('/api/v1/accommodations/26754/reviews')
          .set('Authorization', requesterToken)
          .send(review)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
    describe('Cannot get reviews for non existing accommodation', () => {
      it('should respond with 404 error', (done) => {
        chai.request(app)
          .get('/api/v1/accommodations/26754/reviews')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
  });

  describe('Update accommodation review', () => {
    describe('Unauthenticated user cannot update review', () => {
      it('should respond with unauthenticated error', (done) => {
        chai.request(app)
          .patch(`${reviewUrl}/2`)
          .send(review)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
    describe('Owner can update review', () => {
      it('should respond with 200 and review data', (done) => {
        chai.request(app)
          .patch(`${reviewUrl}/2`)
          .set('Authorization', requesterToken)
          .send(review)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('success', true);
            done();
          });
      });
    });
    describe('User cannot update another user review', () => {
      it('should respond with 404', (done) => {
        chai.request(app)
          .patch(`${reviewUrl}/1`)
          .set('Authorization', requesterToken)
          .send(review)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
  });
  describe('Delete accommodation review', () => {
    describe('Unauthenticated user cannot delete review', () => {
      it('should respond with unauthenticated error', (done) => {
        chai.request(app)
          .delete(`${reviewUrl}/2`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
    describe('Owner can delete review', () => {
      it('should respond with 200', (done) => {
        chai.request(app)
          .delete(`${reviewUrl}/2`)
          .set('Authorization', requesterToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('success', true);
            done();
          });
      });
    });
    describe('User cannot delete another user review', () => {
      it('should respond with 404', (done) => {
        chai.request(app)
          .delete(`${reviewUrl}/1`)
          .set('Authorization', requesterToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
  });
});
