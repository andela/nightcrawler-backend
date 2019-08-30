import * as userServices from './user.services';
import { respondWithSuccess, respondWithWarning } from '../../helpers/responseHandler';


/**
 * Creates a new user
 * @param {Object} req
 * @param {Object} res
 * @returns {Function} CreateUser
 */
export const createUser = (req, res) => {
  const data = req.body;
  return userServices.createUser(data, res);
};

/**
 * Function updates user role
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const editUserRole = async (req, res) => {
  try {
    const { email } = req.body;
    const { roleId } = req.params;
    const user = await userServices.findSingleUser({ email });
    if (!user) {
      return respondWithWarning(res, 404, `resource with email ${email} not found`);
    }

    if (user.dataValues.roleId === parseInt(roleId, 10)) {
      return respondWithWarning(res, 409, 'user already belongs to this role');
    }

    const role = await userServices.findSingleRole({ id: roleId });
    const newRole = await user.setRoles(role);
    delete newRole.dataValues.password;

    return respondWithSuccess(res, 200, 'resource successfully updated', newRole.dataValues);
  } catch (error) {
    return respondWithWarning(res, 500, 'Server Error');
  }
};
