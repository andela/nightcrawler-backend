import Model from '../../models';
import responseHandler from '../../helpers/responseHandler';

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
    return responseHandler.success(res, { message: 'User created successfully', user }, 201);
  } catch (error) {
    const { message, code } = error;
    return responseHandler.error(res, { message }, code || 500);
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
    return responseHandler.success(res, { message: 'Users created successfuly' }, 201);
  } catch (error) {
    const { message, code, field: user } = error;
    return responseHandler.error(res, { message, user }, code || 500);
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
