import Model from '../models';

const { Permission, Role } = Model;

/**
 * @param {object} condition
 * @returns {object} response object containing the information of all roles
 */
export const findAllRoles = async () => {
  const roles = await Role.findAll();

  return roles;
};

/**
 * @param {object} roleId
 * @returns {object} response object containing the information of a single role permissions
 */
export const findAllRolePermissions = async (roleId) => {
  const rolePermission = await Role.findOne({
    where: { id: roleId },
    attributes: ['id', 'role'],
    include: {
      model: Permission,
      as: 'permissions',
      attributes: ['id', 'actionName'],
    }
  });

  return rolePermission;
};

/**
 * @param {integer} roleId
 * @param {object} permissions
 * @returns {object} response object containing the information of the updated permissions
 */
export const updateRolePermissions = async (roleId, permissions) => {
  const role = await Role.findByPk(roleId);
  await role.addPermission(permissions);
  const updatedPermissions = await findAllRolePermissions(roleId);

  return updatedPermissions;
};
