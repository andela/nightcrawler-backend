'use strict';
module.exports = (sequelize, DataTypes) => {
  const Housing = sequelize.define('Housing', {
    location: DataTypes.STRING
  }, {});
  Housing.associate = function(models) {
    // associations can be defined here
  };
  return Housing;
};