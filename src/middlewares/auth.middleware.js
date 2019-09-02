/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import joiValidator from '../helpers/joiValidator';
import * as responseHandler from '../helpers/responseHandler';

/**
 * validate email and password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
export const validateSigninFormData = async (req, res, next) => {
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
  return responseHandler.respondWithWarning(res, 400, errors, null);
};
