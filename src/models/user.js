import { passwordHash } from '../helpers/hash';
import Model from './index';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {});

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'roles', timestamps: false });
    User.hasMany(models.TripRequest, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
 User.beforeCreate(async (user) => {
    const error = new Error();
    error.code = 422;
    error.field = { ...user.dataValues };
    const foundUser = await User.findOne({
      where: {
        [Model.Sequelize.Op.or]: [{ email: user.email }, { username: user.username }]
      }
    });
    if (foundUser) {
      error.message = 'User already exists';
      return Model.Sequelize.Promise.reject(error);
    }
    const role = await Model.Role.findByPk(user.roleId, {
      attributes: ['id']
    });
    if (!role) {
      error.message = 'Role not found';
      return Model.Sequelize.Promise.reject(error);
    }
    return passwordHash(user.lastName).then(password => {
      user.password = password;
    });
  });
  return User;
};
