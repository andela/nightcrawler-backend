import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import validator from '../helpers/validator';
import { respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

/**
 * validate email and password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
export const validateChatFormData = (req, res, next) => {
  const data = {
    userId: req.auth.id,
    recipient: req.body.recipient,
    sender: req.body.sender,
    message: req.body.message,
  };
  const createChatSchema = Joi.object().keys({
    userId: validator.id,
    recipient: validator.email,
    sender: validator.email,
    message: validator.name,
  });

  const errors = joiValidator(data, createChatSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, 'Bad request', errors);
};

/**
 * validate email and password
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
export const validateChatQuery = (req, res, next) => {
  const getChatSchema = Joi.object().keys({
    recipient: validator.email,
    sender: validator.email,
  });

  const errors = joiValidator(req.query, getChatSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, 'Bad request', errors);
};
