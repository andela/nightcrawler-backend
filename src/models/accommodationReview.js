export default (sequelize, DataTypes) => {
  const AccommodationReview = sequelize.define('AccommodationReview', {
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  AccommodationReview.associate = (models) => {
    AccommodationReview.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId', as: 'accommodation', timestamps: false
    });
    AccommodationReview.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user', timestamps: false
    });
  };
  return AccommodationReview;
};
