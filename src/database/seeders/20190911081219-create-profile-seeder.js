export default {
  up: (queryInterface) => queryInterface.bulkInsert('Profiles', [
    {
      userId: 4,
      gender: 'male',
      managerId: 1,
      birthDate: '2008-09-15',
      preferredLanguage: 'English',
      preferredCurrency: 'Dollars',
      homeAddress: 'Brookes lane, Texas'
    },
    {
      userId: 5,
      gender: 'male',
      managerId: 1,
      birthDate: '2008-09-15',
      preferredLanguage: 'French',
      preferredCurrency: 'Frac',
      homeAddress: 'kdjbbdjbuddjknkn'
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Profiles', null, {})
};
