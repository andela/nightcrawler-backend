
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TripRequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    origin: {
      type: Sequelize.STRING
    },
    destination: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    reason: {
      type: Sequelize.STRING
    },
    accomodationId: {
      type: Sequelize.INTEGER
    },
    departureDate: {
      type: Sequelize.STRING
    },
    returnDate: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('TripRequests')
};
