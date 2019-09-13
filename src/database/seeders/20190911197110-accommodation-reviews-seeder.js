export default {
  up: (queryInterface) => queryInterface.bulkInsert('AccommodationReviews', [
    {
      review: 'Enojoyed my stay here.immy ',
      accommodationId: 1,
      userId: 5
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('AccommodationReviews', null, {})
};
