export default {
  up: (queryInterface) => queryInterface.bulkInsert('Likes', [
    {
      userId: 2,
      accommodationId: 1
    },
    {
      userId: 3,
      accommodationId: 1
    },
    {
      userId: 2,
      accommodationId: 2
    },
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Likes', null, {})
};
