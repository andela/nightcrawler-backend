import * as roleServices from './roles.services';
import { respondWithSuccess, respondWithWarning } from '../../helpers/responseHandler';

/**
 * Function gets all permissions available
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getRoles = async (req, res) => {
  try {
    const permissions = await roleServices.findAllRoles();
    if (!permissions) {
      return respondWithWarning(res, 404, 'resource not found');
    }
    return respondWithSuccess(res, 200, 'resource successfully fetched', permissions);
  } catch (error) {
    return respondWithWarning(res, 500, 'Server Error');
  }
};

/**
 * Function gets all permissions available
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const rolePermissions = await roleServices.findAllRolePermissions(roleId);
    if (!rolePermissions) {
      return respondWithWarning(res, 404, 'resources not found');
    }
    return respondWithSuccess(res, 200, 'resource successfully fetched', rolePermissions.dataValues);
  } catch (error) {
    return respondWithWarning(res, 500, 'Server Error');
  }
};

/**
 * Function gets all permissions available
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const updateRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;
    const rolePermissions = await roleServices.updateRolePermissions(roleId, permissions);
    return respondWithSuccess(res, 200, 'resource successfully updated', rolePermissions.dataValues);
  } catch (error) {
    // return respondWithWarning(res, 500, 'Server Error');
    return respondWithWarning(res, 500, error.message);
  }
};
