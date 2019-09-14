/* eslint-disable no-unused-vars */
export default {
  up: async (queryInterface) => queryInterface.bulkInsert('TripRequests', [
    {
      origin: 'Lagos',
      destinationId: 2,
      reason: 'Trade Fair',
      departureDate: '9/9/2019',
      type: 'one-way',
      userId: 4,
      status: 'pending'
    },
    {
      origin: 'Capetown',
      destinationId: 1,
      reason: 'Vacation with my family',
      type: 'multi-city',
      departureDate: '9/9/2019',
      status: 'approved',
      userId: 2
    },
    {
      origin: 'London',
      destinationId: 5,
      reason: 'Vacation with my family',
      type: 'one-way',
      departureDate: '9/9/2019',
      status: 'pending',
      userId: 2
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('TripRequests', null, {})
};
