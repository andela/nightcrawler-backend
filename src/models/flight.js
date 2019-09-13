
export default (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destinationId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airline: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Flight.associate = (models) => {
    Flight.hasMany(models.TripRequest, { foreignKey: 'returnDate' });
    Flight.hasMany(models.TripRequest, { foreignKey: 'departureDate' });
  };
  return Flight;
};
