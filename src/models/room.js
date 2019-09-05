export default (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accommodationId: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Room.associate = (models) => {
    Room.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'accommodation',
      timestamps: false
    });
  };
  return Room;
};
