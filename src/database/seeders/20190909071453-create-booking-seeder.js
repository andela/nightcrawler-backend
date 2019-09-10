export default {
  up: (queryInterface) => queryInterface.bulkInsert('Bookings', [
    {
      userId: 2,
      accommodationId: 2,
      tripId: 1,
      adults: 2,
      children: 0,
      checkIn: '2019-09-09T00:09:31.812Z',
      checkOut: '2019-09-09T00:09:31.812Z'
    },
    {
      userId: 2,
      accommodationId: 2,
      tripId: 1,
      adults: 2,
      children: 0,
      checkIn: '2019-09-09T00:09:31.812Z',
      checkOut: '2019-09-09T00:09:31.812Z'
    }

  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Bookings', null, {})
};
