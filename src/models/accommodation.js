export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facilities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      timestamps: false,
      onDelete: 'CASCADE'
    });
    Accommodation.hasMany(models.Room, {
      foreignKey: 'accommodationId',
      as: 'rooms',
      timestamps: false
    });
    Accommodation.hasMany(models.Like, {
      foreignKey: 'accommodationId',
      as: 'likes',
      timestamps: false
    });
  };
  return Accommodation;
};
