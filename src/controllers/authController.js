import _ from 'lodash';
import { generateToken } from '../helpers/jwt';
import { respondWithWarning, respondWithSuccess } from '../helpers/responseHandler';
import { comparePasswords } from '../helpers/hash';
import statusCode from '../helpers/statusCode';
import resMessage from '../helpers/responseMessages';

/**
* Login a user
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
export const signin = async (req, res) => {
  const { password } = req.body;
  const comparePassword = await comparePasswords(password, req.user.password);
  if (!comparePassword) {
    return respondWithWarning(res, statusCode.unauthorizedAccess, resMessage.incorrectPassword);
  }
  const { id, roleId } = req.user;
  const payload = { id, roleId };
  req.user.token = await generateToken(payload);
  return respondWithSuccess(res, statusCode.success, resMessage.successfulLogin, _.omit(req.user, ['password']));
};
