export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SubTripRequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tripId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    subOrigin: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subDestinationId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    subDepartureDate: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subReason: {
      type: Sequelize.STRING,
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
  down: (queryInterface) => queryInterface.dropTable('SubTripRequests')
};
