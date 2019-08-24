import Joi from '@hapi/joi';
import joiValidator from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';

/**
 *   Class to validate user login and signup forms submission
 */
class ValidateAuth {
  /**
   * validate email and password
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
  static validateSigninFormData(req, res, next) {
    const password = Joi.string().required();
    const email = Joi.string().email().required();
    const createSignUpSchema = Joi.object().keys({
      password,
      email
    });
    const errors = joiValidator(req.body, createSignUpSchema);
    if (!errors) {
      return next();
    }
    return respondWithWarning(res, 400, errors);
  }
}
export default ValidateAuth;
