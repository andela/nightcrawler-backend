import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';
import { country } from '../helpers/countriesList';

/**
   * validate create accommodation
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const createAccommodation = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().required(),
    facilities: Joi.array().items(Joi.string().required()).required(),
    cost: Joi.number().integer().min(0),
    type: Joi.array().items(Joi.string().required()).required(),
    country: Joi.string().valid(country).required().error(() => 'enter a valid country'),
  });
  const errors = joiValidator(req.body, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};
/**
   * validate create room
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const createRoom = (req, res, next) => {
  const data = req.body;
  data.accommodationId = req.params.accommodationId;
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    accommodationId: Joi.number().required()
  });
  const errors = joiValidator(data, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};
