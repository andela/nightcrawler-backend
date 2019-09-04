import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import validator from '../helpers/validator';
import { respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';
import resMessage from '../helpers/responseMessages';

/**
 * validate email and password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
export const validateSigninFormData = (req, res, next) => {
  const createSignInSchema = Joi.object().keys({
    email: validator.email,
    password: validator.password
  });

  const errors = joiValidator(req.body, createSignInSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, resMessage.badInputRequest, errors);
};

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Function} next middleware
 */
export const validateSignUpFormData = (req, res, next) => {
  const data = req.body;

  const rules = Joi.object().keys({
    firstName: validator.name,
    lastName: validator.name,
    username: validator.username,
    email: validator.email,
    roleId: validator.id,
  });
  const schema = data.constructor === Array ? Joi.array().items(rules) : rules;
  const errors = joiValidator(data, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad requst', errors);
};

/**
 * validate email field
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @param {Function} next the callback function
 * @returns {Object} error
 */
export const validateForgotPasswordForm = (req, res, next) => {
  const forgotPasswordSchema = Joi.object().keys({
    email: validator.email
  });

  const errors = joiValidator(req.body, forgotPasswordSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, resMessage.badInputRequest, errors);
};

export const validateResetForgotPasswordForm = (req, res, next) => {
  const resetPasswordSchema = Joi.object().keys({
    password: validator.password,
    confirmPassword: validator.password,
  });

  const errors = joiValidator(req.body, resetPasswordSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, resMessage.badInputRequest, errors);
};

/**
 * validate email field
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @param {Function} next the callback function
 * @returns {Object} error
 */
export const validateResetUserPasswordForm = (req, res, next) => {
  const resetPasswordSchema = Joi.object().keys({
    oldPassword: validator.password,
    newPassword: validator.password,
  });

  const errors = joiValidator(req.body, resetPasswordSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, resMessage.badInputRequest, errors);
};
