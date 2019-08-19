// eslint-disable-next-line no-unused-vars
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Trip EndPoints Tests', () => {
  it('Should pass when length of location is equal five', () => {
    assert.equal('Lagos'.length, 5);
  });
});
