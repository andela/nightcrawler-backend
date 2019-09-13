import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';
import statusCode from '../helpers/statusCode';
import { respondWithWarning } from '../helpers/responseHandler';
import { joiValidator } from '../helpers/joiValidator';

const Joi = BaseJoi.extend(Extension);

export const flightValidator = (req, res, next) => {
  const flightSchema = {
    airline: Joi.string().required(),
    ticketNumber: Joi.string().required(),
    returnDate: Joi.date().format('DD-MM-YYYY')
  };
  const errors = joiValidator(req.body, flightSchema);
  if (!errors) return next();
  return respondWithWarning(res, statusCode.badRequest, 'Bad request', errors);
};


export const checkTripStatus = async (req, res, next) => {
  const { status } = req.trip;
  if (status === 'approved') { return next(); }
  return respondWithWarning(res, statusCode.unprocessableEntity, 'Not allowed');
};
