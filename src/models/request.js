'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    request_body: DataTypes.STRING,
    user_id: DataTypes.NUMBER
  }, {});
  Request.associate = models => {
    // associations can be defined here
    Request.belongsTo(models.User);
  };
  return Request;
};