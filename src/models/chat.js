export default (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {});
  Chat.associate = (models) => {
    Chat.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Chat;
};
