export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'users', timestamps: false });
    Notification.hasMany(models.Comment, {
      foreignKey: 'commentId', onDelete: 'CASCADE'
    });
  };
  return Notification;
};
