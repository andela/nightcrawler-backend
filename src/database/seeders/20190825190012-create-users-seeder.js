import { passwordHash } from '../../helpers/hash';

/* eslint-disable no-unused-vars */
export default {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
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
    {
      firstName: 'Lionel',
      lastName: 'Messi',
      username: 'lionel',
      email: 'lionelmessi@nomad.com',
      password: await passwordHash('123456'),
      roleId: 3
    },
    {
      firstName: 'Alex',
      lastName: 'Iwobi',
      username: 'alexiwobi',
      email: 'alexiwobi@nomad.com',
      password: await passwordHash('123456'),
      roleId: 4
    },
    {
      firstName: 'Jack',
      lastName: 'Marcus',
      username: 'marcus',
      email: 'marcus@nomad.com',
      password: await passwordHash('123456'),
      roleId: 5
    },
    {
      firstName: 'John',
      lastName: 'Jammy',
      username: 'jammjones',
      email: 'jammjones@nomad.com',
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
