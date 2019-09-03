import { respondWithWarning } from '../helpers/responseHandler';
import Model from '../models';

const { Permission, Role } = Model;

/**
 * This function checks if a user is authorized to perform an action
 * @param {object} permission to check
 * @returns {object} forbidden response object if action not allowed
 * @callback next
 */
export default (permission) => async (req, res, next) => {
  const { roleId } = req.auth;

  const rolePermissions = await Role.findOne({
    where: { id: roleId },
    attributes: ['role'],
    include: [
      {
        where: { actionName: permission },
        model: Permission,
        as: 'permissions',
        attributes: ['actionName']
      }
    ]
  });
  if (!rolePermissions) {
    return respondWithWarning(res, 403, 'Forbidden Action');
  }
  return next();
};
