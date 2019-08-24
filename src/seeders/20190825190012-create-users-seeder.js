import { passwordHash } from '../helpers/hash';

/* eslint-disable no-unused-vars */
export default {
  /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkInsert('People', [{
      role: 'John Doe',
      isBetaMember: false
    }], {});
    */
  up: async queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstName: 'Jeffery',
      lastName: 'Way',
      username: 'jeff',
      email: 'admin@nomad.com',
      password: await passwordHash('123456'),
      roleId: 1
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@nomad.com',
      password: await passwordHash('123456'),
      roleId: 6
    },
  ], {}),

  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('People', null, {});
  */
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
