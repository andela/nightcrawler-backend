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
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  TripRequest.associate = models => {
    TripRequest.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
    TripRequest.belongsTo(models.Destination, { foreignKey: 'destinationId', as: 'destination', onDelete: 'CASCADE' });
    TripRequest.hasMany(models.Comment, { foreignKey: 'tripId' });
    TripRequest.hasMany(models.SubTripRequest, {
      foreignKey: 'tripId',
      as: 'subTrips',
      timestamps: false
    });
    TripRequest.belongsTo(models.Flight, { foreignKey: 'returnDate', onDelete: 'CASCADE' });
    TripRequest.belongsTo(models.Flight, { foreignKey: 'departureDate', onDelete: 'CASCADE' });
  };
  return TripRequest;
};
