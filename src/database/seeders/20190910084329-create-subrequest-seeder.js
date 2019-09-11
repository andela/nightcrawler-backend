export default {
  up: async (queryInterface) => queryInterface.bulkInsert('SubTripRequests', [
    {
      subOrigin: 'Lagos',
      subDestinationId: 6,
      subDepartureDate: '2019-10-09T00:09:31.812Z',
      subReason: 'Meet CEO',
      tripId: 2
    },
    {
      subOrigin: 'Kampala',
      subDestinationId: 3,
      subDepartureDate: '2019-11-09T00:09:31.812Z',
      subReason: 'Meeting with top company clients',
      tripId: 2
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('SubTripRequests', null, {})
};
