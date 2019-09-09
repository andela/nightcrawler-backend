export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TripRequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    destinationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    departureDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    returnDate: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: new Date()
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('TripRequests')
};
