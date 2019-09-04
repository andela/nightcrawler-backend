// eslint-disable-next-line no-unused-vars
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const createUrl = '/api/v1/users';
const loginUrl = '/api/v1/auth/signin';

chai.use(chaiHttp);

const admin = {
  email: 'admin@nomad.com',
  password: '123456',
};

const user = {
  email: 'johndoe@nomad.com',
  password: '123456',
};

const newUser = {
  firstName: 'Gabriel',
  lastName: 'Mark',
  username: 'gabu',
  email: 'gabriel.mark@nomad.com',
  roleId: 6
};

const newUsers = [
  {
    firstName: 'Ada',
    lastName: 'Nwodo',
    username: 'adah',
    email: 'adah@nomad.com',
    roleId: 6,
  },
  {
    firstName: 'Quincy',
    lastName: 'Larsson',
    username: 'lass',
    email: 'lass@nomad.com',
    roleId: 6,
  },
];

let userToken;
let adminToken;

describe('Create user(s) test', () => {
  before(async () => {
    await chai.request(app)
      .post(loginUrl)
      .send(user)
      .then((res) => {
        userToken = res.body.payload.token;
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
  describe('Unauthenticated user cannot create user', () => {
    it('should respond with unauthenticated error', (done) => {
      chai.request(app)
        .post(createUrl)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });

  describe('Unauthorized user cannot create user', () => {
    it('should respond with forbidden error', (done) => {
      chai.request(app)
        .post(createUrl)
        .set('Authorization', userToken)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });
  describe('Can create a single user', () => {
    it('should respond with status 201 and user data', (done) => {
      chai.request(app)
        .post(createUrl)
        .set('Authorization', adminToken)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('success', true);
          expect(res.body.payload.email).to.equal(newUser.email);
          expect(res.body.payload.firstName).to.equal(newUser.firstName);
          expect(res.body.payload.lastName).to.equal(newUser.lastName);
          expect(res.body.payload.username).to.equal(newUser.username);
          done();
        });
    });
  });
  describe('Cannot create a user with already existing email', () => {
    it('should respond with error message', (done) => {
      chai.request(app)
        .post(createUrl)
        .set('Authorization', adminToken)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });
  describe('Can create multiple users', () => {
    it('should respond with status 201 status', (done) => {
      chai.request(app)
        .post(createUrl)
        .set('Authorization', adminToken)
        .send(newUsers)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('success', true);
          done();
        });
    });
  });
  describe('When creating multiple users, should fail if duplicate data or roleId does not exist', () => {
    it('should respond with error and user data', (done) => {
      chai.request(app)
        .post(createUrl)
        .set('Authorization', adminToken)
        .send(newUsers)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('success', false);
          done();
        });
    });
  });
  describe('Cannot create record with invalid data', () => {
    describe('Cannot create record with invalid firstName', () => {
      it('should respond with error for empty field', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: '',
            lastName: 'Odjegba',
            email: 'jonathan@nomad.com',
            roleId: 1
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for white spaces', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: '         ',
            lastName: 'Odjegba',
            email: 'jonathan@nomad.com',
            roleId: 1
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
    describe('Cannot create record with invalid lastName', () => {
      it('should respond with error for empty field', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Jonathan',
            lastName: '',
            email: 'jonathan@nomad.com',
            roleId: 1
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for white spaces', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Jonathan',
            lastName: '               ',
            email: 'jonathan@nomad.com',
            roleId: 1
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
    describe('Cannot create record with invalid email', () => {
      it('should respond with error for empty field', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Jonathan',
            lastName: 'Odjegba',
            email: '',
            roleId: 1
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for white spaces', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Jonathan',
            lastName: 'Odjegba',
            email: '                   ',
            roleId: 1
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for invalid email', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Jonathan',
            lastName: 'Odjegba',
            email: 'jonathan',
            roleId: 1
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
    describe('Cannot create record with invalid roleId', () => {
      it('should respond with error for empty field', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Jonathan',
            lastName: 'Odjegba',
            email: 'jonathan@nomad.com',
            roleId: ''
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for white spaces', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Jonathan',
            lastName: 'Odjegba',
            email: 'jonathan@nomad.com',
            roleId: '                 '
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for string passed as roleId', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Jonathan',
            lastName: 'Odjegba',
            email: 'jonathan@nomad.com',
            roleId: 'Hello'
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
      it('should respond with error for non existing roleId', (done) => {
        chai.request(app)
          .post(createUrl)
          .set('Authorization', adminToken)
          .send({
            firstName: 'Gabriel',
            lastName: 'Mark',
            username: 'gabu',
            email: 'gabriel.mark@nomad.com',
            roleId: 690864
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('success', false);
            done();
          });
      });
    });
  });
});
