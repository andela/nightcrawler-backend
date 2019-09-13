export default {
  up: (queryInterface) => queryInterface.bulkInsert('Notifications', [
    {
      type: 'Trip Comment',
      title: 'Trip Comment',
      message: 'A comment was made on Trade Fair',
      tripId: 1,
      commentId: 1,
      userId: 3
    },
    {
      type: 'Trip Comment',
      title: 'Trip Comment',
      message: 'We are pleased to inform you that your request have been approved',
      tripId: 1,
      commentId: 1,
      userId: 3
    },
    {
      type: 'Trip Comment',
      title: 'Trip Comment',
      message: 'We are pleased to inform you that your request have been approved',
      tripId: 1,
      commentId: 1,
      userId: 2,
      
    },
    {
      type: 'Trip Comment',
      title: 'Trip Comment',
      message: 'We are pleased to inform you that your request have been approved',
      tripId: 1,
      commentId: 1,
      userId: 2,
      
    },
    {
      type: 'Trip Comment',
      title: 'Trip Comment',
      message: 'We are pleased to inform you that your request have been approved',
      tripId: 1,
      commentId: 1,
      userId: 2,
      
    },
    {
      type: 'Trip Comment',
      title: 'Trip Comment',
      message: 'We are pleased to inform you that your request have been approved',
      tripId: 1,
      commentId: 1,
      userId: 2,
    },
    
  ]),

  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {})
};
