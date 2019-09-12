import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

/**
   * validate trip request form
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const validateMultipleRequests = (req, res, next) => {
  const tripRequestSchema = Joi.object().keys({
    origin: Joi.string().required(),
    destinationId: Joi.number().required(),
    type: Joi.string().required(),
    reason: Joi.string().required(),
    departureDate: Joi.string().required(),
    subRequest: Joi.array().items(Joi.object().keys({
      subOrigin: Joi.string().required(),
      subDestinationId: Joi.number().required(),
      subDepartureDate: Joi.string().required(),
      subReason: Joi.string().required(),
    })).required()
  });
  const errors = joiValidator(req.body, tripRequestSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, statusCode.badRequest, errors);
};
