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

 export const validateEditRequest= (req, res, next) => {
  const tripRequestSchema = Joi.object().keys({
    tripId: Joi.number().integer().required(),
    destinationId: Joi.number().required(),
    departureDate: Joi.string().required(),
    reason: Joi.string().required(),
    type: Joi.string().required()
  });
  const data = { tripId: req.params.tripId, ...req.body };
  const errors = joiValidator(data, tripRequestSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, errors);
};