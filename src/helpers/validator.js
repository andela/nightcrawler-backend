import Joi from '@hapi/joi';

export default {
  name: Joi.string().required().trim(),
  password: Joi.string().required(),
  email: Joi.string().email().required().trim(),
  username: Joi.string().required().trim().min(3),
  id: Joi.number().required(),

  // Profile validations
  saveProfile: Joi.boolean().required(),
  gender: Joi.string().valid('male', 'Male', 'female', 'Female').required(),
  managerId: Joi.number().integer().required(),
  birthDate: Joi.date().iso().required(),
  preferredLanguage: Joi.string().required(),
  preferredCurrency: Joi.string().required(),
  homeAddress: Joi.string().min(3).max(100).required(),

  // Optional profile validations
  optionalSaveProfile: Joi.boolean(),
  optionalGender: Joi.string().valid('male', 'Male', 'female', 'Female'),
  optionalManagerId: Joi.number().integer(),
  optionalBirthDate: Joi.date(),
  optionalPreferredLanguage: Joi.string(),
  optionalPreferredCurrency: Joi.string(),
  optionalHomeAddress: Joi.string().min(3).max(100)
};
