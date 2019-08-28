export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    actionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Permission;
};
