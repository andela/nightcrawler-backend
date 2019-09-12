export default (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
    },
    accommodationId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Like.associate = (models) => {
    Like.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'likes',
      timestamps: false
    });
  };
  return Like;
};
