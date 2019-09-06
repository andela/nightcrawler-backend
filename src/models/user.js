import { passwordHash } from '../helpers/hash';
import Model from './index';
import { generateToken } from '../helpers/jwt';
import { verifyEmail } from '../helpers/verificationNotifications';
import { EMAIL_SENDER } from '../config/constants';
import { sendMail } from '../helpers/sendMail';
import statusCode from '../helpers/statusCode';


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
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
      allowNull: false,
    }
  }, {});

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'roles', timestamps: false });
    User.hasMany(models.TripRequest, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Like, { foreignKey: 'userId', as: 'accommodationLikes', onDelete: 'CASCADE' });
    User.hasMany(models.AccommodationReview, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Flight, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };
  User.beforeCreate(async (user) => {
    const error = new Error();
    error.code = statusCode.unprocessableEntity;
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

  User.afterCreate(async (user) => {
    const { id, email } = user;
    const token = await generateToken({ id }, {});
    const data = {
      emailFrom: EMAIL_SENDER,
      emailTo: email,
      emailSubject: 'Welcome to Barefoot Nomad! Confirm Your Email',
      emailBody: verifyEmail(email, token),
    };
    sendMail(data);
  });

  return User;
};
