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
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    {
      role: 'Super Administrator',
    },
    {
      role: 'Travel Administrator',
    },
    {
      role: 'Travel Team Member',
    },
    {
      role: 'Manager',
    },
    {
      role: 'Accomodation Supplier',
    },
    {
      role: 'Requester',
    },
  ], {}),

  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('People', null, {});
  */
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
