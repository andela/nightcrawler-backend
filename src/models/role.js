export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: DataTypes.STRING
  }, {});

  Role.associate = (models) => {
    Role.belongsToMany(models.Permission, {
      foreignKey: 'roleId',
      otherKey: 'permissionId',
      as: 'permissions',
      through: 'RolePermissions',
      timestamps: false
    });
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'users',
      timestamps: false
    });
  };

  return Role;
};
