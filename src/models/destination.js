export default (sequelize, DataTypes) => {
  const Destination = sequelize.define('Destination', {
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Destination.associate = (models) => {
    Destination.hasMany(models.TripRequest, { foreignKey: 'destinationId', as: 'tripRequests', timestamps: false });
    Destination.hasMany(models.SubTripRequest, { foreignKey: 'subDestinationId', as: 'subTripRequests', timestamps: false });
  };
  return Destination;
};
