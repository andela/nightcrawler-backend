/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Profiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    rememberMe: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    managerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    birthDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preferredLanguage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preferredCurrency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    homeAddress: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Profiles')
};
