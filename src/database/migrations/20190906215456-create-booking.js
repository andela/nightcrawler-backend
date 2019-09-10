
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Bookings', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    accommodationId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tripId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    adults: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    children: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    checkIn: {
      type: Sequelize.DATE,
      allowNull: false
    },
    checkOut: {
      type: Sequelize.DATE,
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
  down: (queryInterface) => queryInterface.dropTable('Bookings')
};
