export default {
  up: (queryInterface) => queryInterface.bulkInsert('Comments', [
    {
      tripId: 1,
      userId: 3,
      comment: 'I would love to go for that trade fair because it is going to be an eyes opener for me as it exposes me to experience more technical application that can be applied to this company and yeild greater profit',
    },
    {
      tripId: 1,
      userId: 3,
      comment: 'Good to Go',
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Comments', null, {})
};
