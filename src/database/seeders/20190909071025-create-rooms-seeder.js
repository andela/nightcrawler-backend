export default {
  up: (queryInterface) => queryInterface.bulkInsert('Rooms', [
    {
      accommodationId: 2,
      name: 'Master Bedroom',
      type: 'single'
    },
    {
      accommodationId: 2,
      name: 'Master Bedroom',
      type: 'single'
    },
    {
      accommodationId: 1,
      name: 'Master Bedroom',
      type: 'single'
    },
    {
      accommodationId: 3,
      name: 'Master Bedroom',
      type: 'single'
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Rooms', null, {})
};
