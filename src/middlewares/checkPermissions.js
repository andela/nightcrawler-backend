import * as userServices from '../modules/user/user.services';
import { respondWithWarning } from '../helpers/responseHandler';

export default (permission = null) => async (req, res, next) => {
  const { roleId } = req.auth;

  if (await userServices.hasPermission(permission, roleId)) {
    return next();
  }
  return respondWithWarning(res, 403, 'Foridden action');
};
