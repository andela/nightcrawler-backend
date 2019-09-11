export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    accommodationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Rating.associate = (models) => {
    Rating.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'accommodation',
      timestamps: false,
      onDelete: 'CASCADE'
    });
  };
  return Rating;
};
