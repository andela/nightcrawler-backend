import Joi from '@hapi/joi';
import joiValidator from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Function} next middleware
 */
export default function (req, res, next) {
  const data = req.body;

  const rules = Joi.object().keys({
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    username: Joi.string().required().trim().min(3),
    email: Joi.string().email().required().trim(),
    roleId: Joi.number().required(),
  });
  const schema = data.constructor === Array ? Joi.array().items(rules) : rules;
  const errors = joiValidator(data, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad requst', errors);
}
