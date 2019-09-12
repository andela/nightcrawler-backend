export default (sequelize, DataTypes) => {
  const SubTripRequest = sequelize.define('SubTripRequest', {
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subOrigin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subDestinationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subDepartureDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subReason: {
      type: DataTypes.STRING,
    }
  }, {});
  SubTripRequest.associate = models => {
    SubTripRequest.belongsTo(models.TripRequest, {
      foreignKey: 'tripId', as: 'subTripRequests', onDelete: 'CASCADE', timestamps: false
    });
    SubTripRequest.belongsTo(models.Destination, {
      foreignKey: 'subDestinationId', as: 'destination', onDelete: 'CASCADE', timestamps: false
    });
  };
  return SubTripRequest;
};
