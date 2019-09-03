import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
const rolesUrl = '/api/v1/roles';
let currentToken;

describe('ROLE CONTROLLER', () => {
  describe('CHECK ROUTE PERMISSION', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'alexiwobi@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          currentToken = res.body.payload.token;
          done();
        });
    });

    it('it should not assign role if user is not Super Administrator', (done) => {
      chai.request(app)
        .get(`${rolesUrl}`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Forbidden Action');
          done();
        });
    });
  });
  describe('VIEW ROLES ', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'admin@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          currentToken = res.body.payload.token;
          done();
        });
    });
    it('it should get all roles', (done) => {
      chai.request(app)
        .get(`${rolesUrl}`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload[0]).to.have.property('id');
          expect(res.body.payload[0]).to.have.property('role');
          done();
        });
    });
  });

  describe('VIEW ROLE PERMISSIONS', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'admin@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          currentToken = res.body.payload.token;
          done();
        });
    });
    it('it should get specific role permissions', (done) => {
      chai.request(app)
        .get(`${rolesUrl}/3/permissions`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('role');
          expect(res.body.payload).to.have.property('permissions');
          expect(res.body.payload.permissions[0]).to.have.property('id');
          expect(res.body.payload.permissions[0]).to.have.property('actionName');
          done();
        });
    });

    it('it should return error if roleId is empty', (done) => {
      chai.request(app)
        .get(`${rolesUrl}/ /permissions`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('roleId must be a number');
          done();
        });
    });

    it('it should return error if roleId is not integer', (done) => {
      chai.request(app)
        .get(`${rolesUrl}/uy/permissions`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('roleId must be a number');
          done();
        });
    });
  });

  describe('UPDATE ROLE PERMISSIONS', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send({
          email: 'admin@nomad.com', // valid login details
          password: '123456',
        })
        .end((error, res) => {
          currentToken = res.body.payload.token;
          done();
        });
    });
    it('it should update specific role permissions', (done) => {
      chai.request(app)
        .patch(`${rolesUrl}/3/permissions`)
        .send({
          permissions: [1, 3, 5, 6, 8] // array of ids of the permissions to add for that role
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.have.property('id');
          expect(res.body.payload).to.have.property('role');
          expect(res.body.payload).to.have.property('permissions');
          expect(res.body.payload.permissions[0]).to.have.property('id');
          expect(res.body.payload.permissions[0]).to.have.property('actionName');
          done();
        });
    });

    it('it should return error if roleId is empty', (done) => {
      chai.request(app)
        .patch(`${rolesUrl}/ /permissions`)
        .send({
          permissions: [1, 3, 5, 6, 8] // array of ids of the permissions to add for that role
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('roleId must be a number');
          done();
        });
    });

    it('it should return error if roleId is not integer', (done) => {
      chai.request(app)
        .patch(`${rolesUrl}/r5/permissions`)
        .send({
          permissions: [1, 3, 5, 6, 8] // array of ids of the permissions to add for that role
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('roleId must be a number');
          done();
        });
    });

    it('it should return error if permissions is empty', (done) => {
      chai.request(app)
        .patch(`${rolesUrl}/3/permissions`)
        .send({
          permissions: [] // empty permissions
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('permissions does not contain 1 required value(s)');
          done();
        });
    });

    it('it should return error if permissions is not array of integers', (done) => {
      chai.request(app)
        .patch(`${rolesUrl}/3/permissions`)
        .send({
          permissions: ['e3', 2] // empty permissions
        })
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.payload[0]).to.equal('0 must be a number');
          done();
        });
    });
  });
});
