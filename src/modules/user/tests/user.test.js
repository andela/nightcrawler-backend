// eslint-disable-next-line no-unused-vars
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Users EndPoints Tests', () => {
  it('should pass when length of username is equal five', () => {
    assert.equal('Tommy'.length, 5);
  });
});
