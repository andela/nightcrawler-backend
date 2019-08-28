import { passwordHash } from '../helpers/hash';
import Model from './index';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    profileImage: {
      type: DataTypes.STRING,
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
  });

  User.beforeCreate(async (user) => {
    const {
      username, email, firstName, lastName, roleId
    } = user;
    const fields = {
      username, email, firstName, lastName, roleId
    };
    const error = new Error();
    error.code = 422;
    error.field = fields;
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
