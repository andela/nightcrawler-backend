export default (sequelize, DataTypes) => {
  const TripRequest = sequelize.define('TripRequest', {
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  TripRequest.associate = models => {
    TripRequest.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    TripRequest.belongsTo(models.Destination, { foreignKey: 'destinationId', as: 'destination', onDelete: 'CASCADE' });
  };
  return TripRequest;
};
