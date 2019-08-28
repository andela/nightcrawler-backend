import { verifyToken } from '../helpers/JWT';
import responseHandler from '../helpers/responseHandler';

/**
   * Method to generate token
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {Function} next middleware
   */
export default function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return responseHandler.error(res, 'Please signin to continue', 401);
  }
  try {
    const { key } = verifyToken(token);
    req.body.auth = key;
    return next();
  } catch (error) {
    const errorMessage = error.message;
    let message;
    if (errorMessage.includes('invalid') || errorMessage.includes('malformed')) {
      message = 'Session is invalid. Signin to continue';
    } else if (errorMessage.includes('expired')) {
      message = 'Session has expired. Signin to continue';
    } else {
      message = errorMessage;
    }
    return responseHandler.error(res, { message }, 401);
  }
}
