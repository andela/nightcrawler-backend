export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RolePermissions', {
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    permissionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('RolePermissions')
};
