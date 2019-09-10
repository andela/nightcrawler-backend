import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';

/**
   * validate create booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const createBooking = (req, res, next) => {
  const schema = Joi.object().keys({
    tripId: Joi.number().required(),
    accommodationId: Joi.number().required(),
    adults: Joi.number().required(),
    children: Joi.number().required(),
    checkIn: Joi.date().iso().required(),
    checkOut: Joi.date().iso().min(Joi.ref('checkIn')).required()
  });
  const errors = joiValidator(req.body, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};
/**
   * validate get specific booking
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const getOneBooking = (req, res, next) => {
  const schema = Joi.object().keys({
    bookingId: Joi.number().required(),
  });
  const errors = joiValidator(req.params, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};
