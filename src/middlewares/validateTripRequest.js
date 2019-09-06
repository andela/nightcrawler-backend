import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';


/**
   * validate trip request form
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
const validateRequestTripForm = (req, res, next) => {
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

export default validateRequestTripForm;
