
import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';
import validator from '../helpers/validator';
import statusCode from '../helpers/statusCode';
import resMessage from '../helpers/responseMessages';

const Joi = BaseJoi.extend(Extension);

/**
 * validate trip request form
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
export const validateRequestTripForm = (req, res, next) => {
  const origin = Joi.string().required();
  const destinationId = Joi.number().required();
  const type = Joi.string().required();
  const reason = Joi.string().required();
  const departureDate = Joi.string().required();
  const tripRequestSchema = Joi.object().keys({
    origin,
    destinationId,
    departureDate,
    reason,
    type
  });
  const errors = joiValidator(req.body, tripRequestSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, errors);
};

/**
   * validate trip id
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const validateTripId = (req, res, next) => {
  const tripIdSchema = Joi.object().keys({
    tripId: validator.id
  });

  const errors = joiValidator(req.params, tripIdSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, resMessage.badInputRequest, errors);
};

export const validateCreateComment = (req, res, next) => {
  const commentSchema = Joi.object().keys({
    tripId: validator.id,
    comment: validator.username
  });

  const data = {
    tripId: req.params.tripId,
    comment: req.body.comment
  };

  const errors = joiValidator(data, commentSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, resMessage.badInputRequest, errors);
};

/**
   * validate trip and comment id
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const validateDeleteParams = (req, res, next) => {
  const paramsSchema = Joi.object().keys({
    tripId: validator.id,
    commentId: validator.id
  });

  const errors = joiValidator(req.params, paramsSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, resMessage.badInputRequest, errors);
};

/**
 * function to validate return trip request form
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} error
 */
export const validateReturnTripForm = (req, res, next) => {
  const returnTripSchema = {
    origin: Joi.string().required(),
    destinationId: Joi.number().required(),
    departureDate: Joi.date().format('DD-MM-YYYY').required(),
    returnDate: Joi.date().format('DD-MM-YYYY').required(),
    reason: Joi.string().required(),
    accomodationId: Joi.number()
  };
  const errors = joiValidator(req.body, returnTripSchema);
  if (!errors) return next();
  return respondWithWarning(res, 400, errors);
};
