/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Permissions', [
    {
      actionName: 'REGISTER_USERS',
    },
    {
      actionName: 'CREATE_TRIP_REQUEST',
    },
    {
      actionName: 'EDIT_TRIP_REQUEST',
    },
    {
      actionName: 'DELETE_TRIP_REQUEST',
    },
    {
      actionName: 'VIEW_ALL_TRIP_REQUESTS',
    },
    {
      actionName: 'VIEW_USERS_TRIP_REQUESTS',
    },
    {
      actionName: 'VIEW_SINGLE_TRIP_REQUEST',
    },
    {
      actionName: 'DELETE_TRIP_REQUEST',
    },
    {
      actionName: 'APPROVE_TRIP_REQUEST',
    },
    {
      actionName: 'REJECT_TRIP_REQUEST',
    },
    {
      actionName: 'BOOK_ACCOMODATION_FOR_TRIP',
    },
    {
      actionName: 'CREATE_ACCOMODATION_REVIEW',
    },
    {
      actionName: 'EDIT_ACCOMODATION_REVIEW',
    },
    {
      actionName: 'DELETE_ACCOMODATION_REVIEW',
    },
    {
      actionName: 'VIEW_ACCOMODATION_REVIEW',
    },
    {
      actionName: 'LIKE_ACCOMODATION',
    },
    {
      actionName: 'CREATE_TRIP_COMMENT',
    },
    {
      actionName: 'EDIT_TRIP_COMMENT',
    },
    {
      actionName: 'DELETE_TRIP_COMMENT',
    },
    {
      actionName: 'CREATE_NEW_SUPPLIER',
    },
    {
      actionName: 'EDIT_SUPPLIER',
    },
    {
      actionName: 'DELETE_SUPPLIER',
    },
    {
      actionName: 'CREATE_NEW_ACCOMODATION',
    },
    {
      actionName: 'EDIT_ACCOMODATION',
    },
    {
      actionName: 'DELETE_ACCOMODATION',
    },
    {
      actionName: 'VIEW_ACCOMODATION',
    },
    {
      actionName: 'CREATE_USER_PROFILE',
    },
    {
      actionName: 'EDIT_USER_PROFILE',
    },
    {
      actionName: 'VIEW_USER_PROFILE',
    },
    {
      actionName: 'CREATE_CHAT_MESSAGE',
    },
    {
      actionName: 'UPDATE_CHAT_MESSAGE',
    },
    {
      actionName: 'DELETE_CHAT_MESSAGE',
    },
    {
      actionName: 'CREATE_TRIP_FLIGHT_DETAIL',
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Permissions', null, {})
};
