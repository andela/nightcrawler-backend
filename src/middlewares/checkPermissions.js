import * as userServices from '../modules/user/user.services';

import responseHandler from '../helpers/responseHandler';

export default (permission = null) => async (req, res, next) => {
  const { roleId } = req.body.auth;
  if (await userServices.hasPermission(permission, roleId)) {
    return next();
  }
  return responseHandler.error(res, { message: 'Unauthorized Action' }, 403);
};
