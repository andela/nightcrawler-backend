export default {
  up: (queryInterface) => queryInterface.bulkInsert('Chats', [
    {
      userId: 3,
      recipient: 'alexiwobi@nomad.com',
      sender: 'lionelmessi@nomad.com',
      message: 'Hello there ...',
    },
    {
      userId: 4,
      recipient: 'lionelmessi@nomad.com',
      sender: 'alexiwobi@nomad.com',
      message: 'Hello messi, how are you doing?',
    },
    {
      userId: 4,
      recipient: 'lionelmessi@nomad.com',
      sender: 'alexiwobi@nomad.com',
      message: 'I just saw your trip request, i think i need to give you some information on how this whole process goes.',
    },
    {
      userId: 3,
      recipient: 'alexiwobi@nomad.com',
      sender: 'lionelmessi@nomad.com',
      message: 'Ok. I would love you to clarify me on the whole process. What are the things involved for me to have a smooth trip?',
    },
    {
      userId: 4,
      recipient: 'lionelmessi@nomad.com',
      sender: 'alexiwobi@nomad.com',
      message: 'I will be sending you a link. study the information there in and let me know if there are any other things you are not clear about.',
    },
    {
      userId: 3,
      recipient: 'alexiwobi@nomad.com',
      sender: 'lionelmessi@nomad.com',
      message: 'Ok. Thanks. I will look in to it and get back to you.',
    },
    {
      userId: 3,
      recipient: 'johndoe@nomad.com',
      sender: 'lionelmessi@nomad.com',
      message: 'Hello there ...',
    },
    {
      userId: 2,
      recipient: 'lionelmessi@nomad.com',
      sender: 'johndoe@nomad.com',
      message: 'Hello messi, how are you doing?',
    },
    {
      userId: 2,
      recipient: 'lionelmessi@nomad.com',
      sender: 'johndoe@nomad.com',
      message: 'I just saw your trip request, i think i need to give you some information on how this whole process goes.',
    },
    {
      userId: 3,
      recipient: 'johndoe@nomad.com',
      sender: 'lionelmessi@nomad.com',
      message: 'Ok. I would love you to clarify me on the whole process. What are the things involved for me to have a smooth trip?',
    },
    {
      userId: 2,
      recipient: 'lionelmessi@nomad.com',
      sender: 'johndoe@nomad.com',
      message: 'I will be sending you a link. study the information there in and let me know if there are any other things you are not clear about.',
    },
    {
      userId: 3,
      recipient: 'alexiwobi@nomad.com',
      sender: 'lionelmessi@nomad.com',
      message: 'Ok. Thanks. I will look in to it and get back to you.',
    },
  ]),

  down: queryInterface => queryInterface.bulkDelete('Chats', null, {})
};
