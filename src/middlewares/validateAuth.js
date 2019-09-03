import Joi from '@hapi/joi';
import joiValidator from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';

/**
   * validate email and password
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
const validateSigninFormData = (req, res, next) => {
  const password = Joi.string().required();
  const email = Joi.string().email().required();

  const createSignUpSchema = Joi.object().keys({
    password,
    email,
  });

  const errors = joiValidator(req.body, createSignUpSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

export default { validateSigninFormData };
