import Model from '../../models';

const { Permission } = Model;

/**
 * @param {object} condition
 * @returns {object} an object containing the information of all permissions
 */
export const findAllPermissions = async () => {
  const permissions = await Permission.findAll({
    attributes: ['id', 'actionName'],
  });

  return permissions;
};
