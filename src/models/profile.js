export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    rememberMe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferredLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferredCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Profile.associate = (models) => {
    // associations can be defined here
    Profile.belongsTo(models.User, { foreignKey: 'userId', as: 'basicInfo' });
  };
  return Profile;
};
