import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';
import validator from '../helpers/validator';
import statusCode from '../helpers/statusCode';
import resMessage from '../helpers/responseMessages';

/**
   * validate trip request form
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const validateRequestTripForm = (req, res, next) => {
  const origin = Joi.string().required();
  const destination = Joi.string().required();
  const type = Joi.string().required();
  const reason = Joi.string().required();
  const accomodationId = Joi.number().required();
  const departureDate = Joi.string().required();
  const tripRequestSchema = Joi.object().keys({
    origin,
    destination,
    departureDate,
    reason,
    accomodationId,
    type
  });
  const errors = joiValidator(req.body, tripRequestSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, errors);
};

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

export default validateRequestTripForm;
