export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Destinations', [
    {
      destination: 'Lagos',
    },
    {
      destination: 'Kampala',
    },
    {
      destination: 'Cairo',
    },
    {
      destination: 'Texas',
    },
    {
      destination: 'Paris',
    },
    {
      destination: 'Madrid',
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Destinations', null, {})
};
