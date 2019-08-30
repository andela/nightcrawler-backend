import * as permissionsServices from './permissions.services';
import { respondWithWarning, respondWithSuccess } from '../../helpers/responseHandler';

/**
 * Function gets all permissions available
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getPermissions = async (req, res) => {
  try {
    const permissions = await permissionsServices.findAllPermissions();
    if (!permissions) {
      return respondWithWarning(res, 404, 'resource not found');
    }
    return respondWithSuccess(res, 200, 'resource successfully fetched', permissions);
  } catch (error) {
    return respondWithWarning(res, 500, 'Server Error');
  }
};
