export default {
  up: async (queryInterface) => queryInterface.bulkInsert('TripRequests', [
    {
      origin: 'Lagos',
      destination: 'Nairobi',
      reason: 'Trade Fair',
      departureDate: '9/9/2019',
      returnDate: '10/10/2019',
      type: 'one-way',
      userId: 3
    },
    {
      origin: 'Capetown',
      destination: 'Lagos',
      reason: 'Vacation with my family',
      type: 'one-way',
      returnDate: '2019-09-09T00:09:31.812Z',
      departureDate: '2019-19-09T00:09:31.812Z',
      status: 'approved',
      userId: 2
    },
    {
      origin: 'London',
      destination: 'Ikeja',
      reason: 'Vacation with my family',
      type: 'one-way',
      returnDate: '2019-09-09T00:09:31.812Z',
      departureDate: '2019-19-09T00:09:31.812Z',
      status: 'pending',
      userId: 2
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('TripRequests', null, {})
};
