import Joi from '@hapi/joi';
import { joiValidator } from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';
import { country } from '../helpers/countriesList';
import statusCode from '../helpers/statusCode';
import { findAccomodationReviewById } from '../services/accommodationServices';

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
  const data = {
    ...req.body,
    accommodationId: req.params.accommodationId
  };
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

/**
   * validate get trip accommodations
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const getTripAccommodations = (req, res, next) => {
  const data = {
    tripId: req.params.tripId,
  };
  const schema = Joi.object().keys({
    tripId: Joi.number().required()
  });
  const errors = joiValidator(data, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

/**
   * validate accommodationId
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const validateAccommodationId = (req, res, next) => {
  const data = {
    accommodationId: req.params.accommodationId,
  };
  const schema = Joi.object().keys({
    accommodationId: Joi.number().integer().required()
  });
  const errors = joiValidator(data, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

/**
   * validate create accommodation review
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {Object} error
   */
export const accommodationReview = (req, res, next) => {
  const schema = Joi.object().keys({
    review: Joi.string().required(),
  });
  const errors = joiValidator(req.body, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

export const verifyAccommodationReview = async (req, res, next) => {
  const review = await findAccomodationReviewById(req.params.reviewId);
  if (!review) {
    return respondWithWarning(res, statusCode.resourceNotFound, 'Review not found');
  }
  return next();
};

export const validateAccommodationRating = (req, res, next) => {
  const data = {
    accommodationId: req.params.accommodationId,
    rating: req.body.rating
  };
  const schema = Joi.object().keys({
    accommodationId: Joi.number().integer().required(),
    rating: Joi.number().min(1).max(5).required()
  });
  const errors = joiValidator(data, schema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};
