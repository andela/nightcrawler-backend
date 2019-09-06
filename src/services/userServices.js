import _ from 'lodash';
import Model from '../models';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';


const { User, Role } = Model;

/**
 * @param {Object} data
 * @param {Object} res
 * @returns {Function} responseHandler
 */
export const createSingle = async (data, res) => {
  try {
    const {
      username, email, firstName, lastName, roleId
    } = data;
    const user = await User.create({
      username, email, firstName, lastName, roleId
    });
    return respondWithSuccess(res, statusCode.created, 'User created successfully', _.omit(user.dataValues, 'password'));
  } catch (error) {
    const { message, code, field: user } = error;
    return respondWithWarning(res, code || statusCode.internalServerError, message, user);
  }
};

/**
 * @param {Object} users
 * @param {Object} res
 * @returns {Function} responseHandler
 */
export const createMultiple = async (users, res) => {
  try {
    await User.bulkCreate(users, { individualHooks: true });
    return respondWithSuccess(res, statusCode.created, 'Users created successfuly');
  } catch (error) {
    const { message, code, field: user } = error;
    return respondWithWarning(res, code || statusCode.internalServerError, message, user);
  }
};

export const createUser = (data, res) => {
  const isArray = data.constructor === Array;
  return isArray ? createMultiple(data, res) : createSingle(data, res);
};

/**
 * Function to update a user password
 * @param {String} userEmail user email
 * @param {String} hashedPassword stored password
 * @returns {Object} users
 */
export const updatePassword = async (userEmail, hashedPassword) => {
  try {
    const user = User.update({
      password: hashedPassword
    }, {
      where: { email: userEmail },
      returning: true,
      logging: false,
      plain: true
    });
    return user;
  } catch (error) {
    return {
      errors: error
    };
  }
};

/**
 * @param {object} condition
 * @returns {object} an object containing the information of the user or null
 */
export const findSingleUser = async (condition = {}) => {
  try {
    const user = Object.keys(condition).length
      ? await User.findOne({
        where: condition,
        logging: false
      })
      : null;

    return user;
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const findSingleRole = async (condition = {}) => {
  try {
    const role = Object.keys(condition).length
      ? await Role.findOne({
        where: condition,
        logging: false
      })
      : null;
    return role;
  } catch (error) {
    return {
      errors: error
    };
  }
};

export const verifyUserAccount = async (id) => {
  try {
    return await User.update({ isVerified: true }, { where: { id } });
  } catch (error) {
    return {
      errors: error
    };
  }
};
