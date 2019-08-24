import Model from '../../models';
import { respondWithSuccess, respondWithWarning } from '../../helpers/responseHandler';

const { Permission, RolePermission, User } = Model;
/**
 * @param {Object} data
 * @param {Object} res
 * @returns {Function} responseHandler
 */
const createSingle = async (data, res) => {
  try {
    const {
      username, email, firstName, lastName, roleId
    } = data;
    const user = await User.create({
      username, email, firstName, lastName, roleId
    });
    delete user.password;
    return respondWithSuccess(res, 201, 'User created successfully', user.dataValues);
  } catch (error) {
    const { message, code } = error;
    return respondWithWarning(res, code || 500, message, error);
  }
};

/**
 * @param {Object} users
 * @param {Object} res
 * @returns {Function} responseHandler
 */
const createMultiple = async (users, res) => {
  try {
    await User.bulkCreate(users, { individualHooks: true });
    return respondWithSuccess(res, 201, 'Users created successfuly');
  } catch (error) {
    const { message, code, field: user } = error;
    return respondWithWarning(res, code || 500, message, user);
  }
};

const createUser = (data, res) => {
  const isArray = data.constructor === Array;
  return isArray ? createMultiple(data, res) : createSingle(data, res);
};

/**
 * @param {object} condition
 * @returns {object} an object containing the information of the user or null
 */
const findSingleUser = async (condition = {}) => {
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

const hasPermission = async (permission = null, roleId = null) => {
  try {
    if (permission && roleId) {
      const data = await Permission.findOne({ where: { actionName: permission }, attributes: ['id'] });
      if (data) {
        const { id: permissionId } = data;
        const result = await RolePermission.findOne({ where: { roleId, permissionId } });
        if (result) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export { findSingleUser, createUser, hasPermission };
