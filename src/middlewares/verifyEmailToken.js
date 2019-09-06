import { respondWithWarning } from '../helpers/responseHandler';
import { verifyToken } from '../helpers/jwt';
import statusCode from '../helpers/statusCode';

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Function} next middleware
 */
export default function (req, res, next) {
  try {
    const { token } = req.body;
    if (!token) {
      return respondWithWarning(res, statusCode.badRequest, 'No token provided');
    }
    const { key } = verifyToken(token);
    req.auth = key;
    return next();
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
}
