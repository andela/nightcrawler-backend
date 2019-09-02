import { passwordHash } from '../helpers/Hash';

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
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      username: 'jeff',
      email: 'admin@nomad.com',
      password: await passwordHash('123456'),
      roleId: 1,
      companyId: 4
    },
    {
      username: 'johndoe',
      email: 'johndoe@nomad.com',
      password: await passwordHash('123456'),
      roleId: 2,
      companyId: 4
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
