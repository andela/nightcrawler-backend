import Joi from '@hapi/joi';

export default {
  name: Joi.string().required().trim(),
  password: Joi.string().required(),
  email: Joi.string().email().required().trim(),
  username: Joi.string().required().trim().min(3),
  id: Joi.number().required(),
};
