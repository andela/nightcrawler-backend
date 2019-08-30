import { verifyToken, formatJWTErrorMessage } from '../helpers/JWT';
import { respondWithWarning } from '../helpers/responseHandler';

/**
   * Method to generate token
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {Function} next middleware
   */
export default function (req, res, next) {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    return respondWithWarning(res, 401, 'Please signin to continue');
  }
  try {
    const { key } = verifyToken(token);
    req.auth = key;
    return next();
  } catch (error) {
    return respondWithWarning(res, 401, formatJWTErrorMessage(error.message));
  }
}
