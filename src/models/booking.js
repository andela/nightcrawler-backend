export default (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    adults: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    children: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {});
  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Booking.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'accommodation',
    });
    Booking.belongsTo(models.TripRequest, {
      foreignKey: 'tripId',
      as: 'tripRequest',
    });
  };
  return Booking;
};
