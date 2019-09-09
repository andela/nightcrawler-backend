export default {
  up: (queryInterface) => queryInterface.bulkInsert('Notifications', [
    {
      type: 'Trip Comment',
      title: 'Trip Comment',
      message: 'A comment was made on Trade Fair',
      tripId: 1,
      commentId: 1,
      userId: 3
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {})
};
