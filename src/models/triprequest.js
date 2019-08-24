
export default (sequelize, DataTypes) => {
  const TripRequest = sequelize.define('TripRequest', {
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accomodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  TripRequest.associate = models => {
    TripRequest.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  return TripRequest;
};
