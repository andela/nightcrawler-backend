export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Flights', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    departureDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    returnDate: {
      type: Sequelize.DATE
    },
    airline: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ticketNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false
    },
    destinationId: {
      type: Sequelize.STRING,
      allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Flights')
};
