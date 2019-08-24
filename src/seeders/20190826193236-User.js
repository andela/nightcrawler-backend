module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'test',
        lastName: 'test',
        email: 'test@example.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'test',
        lastName: 'test',
        email: 'test@example.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
