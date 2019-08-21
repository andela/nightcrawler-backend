// eslint-disable-next-line no-unused-vars
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Accommodation EndPoints Tests', () => {
  it('Should pass when length of accommodation is equal five', () => {
    assert.equal('hotel'.length, 5);
  });
});
