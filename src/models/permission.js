export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    actionName: DataTypes.STRING,
  }, {});

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      foreignKey: 'permissionId',
      otherKey: 'roleId',
      as: 'roles',
      through: 'RolePermissions',
      timestamps: false
    });
  };
  return Permission;
};
