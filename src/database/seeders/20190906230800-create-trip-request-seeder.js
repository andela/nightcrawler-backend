export default {
  up: async (queryInterface) => queryInterface.bulkInsert('TripRequests', [
    {
      origin: 'Lagos, Nigeria',
      destination: 'Nairobi, Kenya',
      reason: 'Trade Fair',
      departureDate: '9/9/2019',
      returnDate: '10/10/2019',
      type: 'one-way',
      userId: 3
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('TripRequests', null, {})
};
