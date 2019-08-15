'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {});
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Request);
  };
  return User;
};