
export default {
  up: (queryInterface) => queryInterface.bulkInsert('Accommodation', [
    {
      country: 'Nigeria',
      city: 'Lagos',
      name: 'Eko Hotel',
      address: 'Plot 52, Kofo Abayomi Street, Victoria Island, Lagos, Nigeria.',
      type: ['Hotel'],
      description: 'Eko Hotel is the main building on our property and it houses most of the attractive features which Eko Hotels & Suites has become known for. These include 447 ...',
      images: ['https://res.cloudinary.com/normad/image/upload/v1567604491/nc-bn/vfac9xcbtbudd7vzpbap.jpg', 'https://res.cloudinary.com/normad/image/upload/v1567604491/nc-bn/mphngyfglwny3i7pn4cm.png'],
      facilities: ['Free-WIFI', 'Parking', '24/7 Electricity'],
      userId: 5
    },
    {
      country: 'Nigeria',
      city: 'Lagos',
      name: 'Eko Hotel',
      address: '1415 Adetokunbo Ademola Street, Victoria Island, Lagos',
      type: ['Hotel'],
      description: 'The Lagos Continental Hotel, is a 5-Star Hotel located at Plot 52A, Kofo Abayomi Street, Victoria Island, within the heart of the central business district of Lagos Nigeria.',
      images: ['https://res.cloudinary.com/normad/image/upload/v1567604491/nc-bn/vfac9xcbtbudd7vzpbap.jpg', 'https://res.cloudinary.com/normad/image/upload/v1567604491/nc-bn/mphngyfglwny3i7pn4cm.png'],
      facilities: ['Free-WIFI', 'Parking', '24/7 Electricity', 'Pool', 'Free breakfast', 'Airport transportation'],
      userId: 1,
      cost: 500000
    },
    {
      country: 'Nigeria',
      city: 'Lagos',
      name: 'Eko Hotel',
      address: 'Sultanahmet Mah Akbiyik Cad No:79, Fatih, 34122 Istanbul, Turkey',
      type: ['Hotel'],
      description: 'Located in Sultanahmet area, Apple Tree Hotel is just 300 m from Blue Mosque.The hotel offers free WiFi throughout the property. Every room at this hotel is air conditioned and is equipped with a flat-screen TV.',
      images: ['https://res.cloudinary.com/normad/image/upload/v1567604491/nc-bn/vfac9xcbtbudd7vzpbap.jpg', 'https://res.cloudinary.com/normad/image/upload/v1567604491/nc-bn/mphngyfglwny3i7pn4cm.png'],
      facilities: ['Free-WIFI', 'Parking', '24/7 Electricity', 'Pool', 'Free breakfast'],
      userId: 5
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Accommodation', null, {})
};
