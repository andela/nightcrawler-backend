/* eslint-disable no-unused-vars */
export default {
  up: async (queryInterface) => queryInterface.bulkInsert('TripRequests', [
    {
      origin: 'Lagos',
      destinationId: 2,
      reason: 'Trade Fair',
      departureDate: '2019-19-09T00:09:31.812Z',
      type: 'one-way',
      userId: 3,
      status: 'pending'
    },
    {
      origin: 'Capetown',
      destinationId: 1,
      reason: 'Vacation with my family',
      type: 'multi-city',
      departureDate: '2019-19-09T00:09:31.812Z',
      status: 'approved',
      userId: 2
    },
    {
      origin: 'London',
      destinationId: 5,
      reason: 'Vacation with my family',
      type: 'one-way',
      departureDate: '2019-19-09T00:09:31.812Z',
      status: 'pending',
      userId: 2
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('TripRequests', null, {})
};