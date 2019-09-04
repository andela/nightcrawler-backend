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
    saveProfile: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
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
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  }
};
