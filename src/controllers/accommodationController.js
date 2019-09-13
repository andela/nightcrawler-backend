/* eslint-disable max-len */
import Model from '../models';
import * as accommodationServices from '../services/accommodationServices';
import * as tripServices from '../services/tripServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

const { Accommodation, Room } = Model;
/**
 * Function creates accommodation
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const createAccommodation = async (req, res) => {
  try {
    const data = {
      ...req.body,
      userId: req.auth.id,
      images: req.files.map(file => file.secure_url)
    };
    const accommodation = await accommodationServices.create(Accommodation, data);
    return respondWithSuccess(res, statusCode.created, 'resource successfully created', accommodation.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function creates rooms for an accommodation
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const createRoom = async (req, res) => {
  try {
    const data = {
      ...req.body,
      accommodationId: parseInt(req.params.accommodationId, 10),
    };
    const accommodation = await accommodationServices.findOne(Accommodation, { id: data.accommodationId });
    if (!accommodation) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'accommodation does not exist');
    }

    const room = await accommodationServices.create(Room, data);
    return respondWithSuccess(res, statusCode.created, 'resource successfully created', room.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function gets all accommodations
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getAccommodations = async (req, res) => {
  try {
    const { city, offset, limit } = req.query;

    const queryOptions = {
      ...city && { city }
    };

    const paginationOptions = {
      ...offset && { offset },
      ...limit && { limit },
    };

    const accommodations = await accommodationServices.findAllAccommodations(queryOptions, paginationOptions);
    if (!accommodations) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'resource not found');
    }
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', accommodations);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function gets all accommodations for a trip
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getTripAccommodations = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const { destinationId } = req.trip;
    const singleDestination = await tripServices.findOneDestination(destinationId);
    const { destination } = singleDestination.toJSON();
    const queryOption = {
      city: destination
    };
    const paginationOptions = {
      ...offset && { offset },
      ...limit && { limit },
    };

    const accommodations = await accommodationServices.findAllAccommodations(queryOption, paginationOptions);

    if (!accommodations) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'resource not found');
    }
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', accommodations);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function gets one accommodations
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getOneAccommodation = async (req, res) => {
  try {
    const { accommodationId } = req.params;
    const accommodations = await accommodationServices.findOneAccommodation(Number(accommodationId));
    if (!accommodations) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'resource not found');
    }
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', accommodations.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function likes an accommodations
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const unlikeAccommodation = async (req, res) => {
  try {
    const { accommodationId } = req.params;
    const { id } = req.auth;
    const likes = await accommodationServices.unlikeAccommodation(id, Number(accommodationId));
    return respondWithSuccess(res, statusCode.success, 'request successful', { likes });
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};
/**
   * Create an accommodation review
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
export const createAccommodationReview = async (req, res) => {
  try {
    const { accommodationId } = req.params;
    const data = {
      accommodationId,
      userId: req.auth.id,
      review: req.body.review
    };
    const review = await accommodationServices.createReview(data);
    return respondWithSuccess(res, statusCode.created, 'Review successfully created', review.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function checks if an accommodations is liked by a particular user
 * This will help UI display of like status
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getLikeStatus = async (req, res) => {
  try {
    const { accommodationId } = req.params;
    const { id } = req.auth;
    const liked = await accommodationServices.checkLikedAccommodation(id, Number(accommodationId));
    if (!liked) {
      return respondWithSuccess(res, statusCode.success, 'fetch successful', { likeStatus: false });
    }
    const payload = { ...liked.toJSON(), likeStatus: true };
    return respondWithSuccess(res, statusCode.success, 'fetch successful', payload);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};
/**
     * Delete an accommodation review
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} response object
     */
export const deleteAccommodationReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { id: userId } = req.auth;
    const review = await accommodationServices.findUserReview(reviewId, userId);
    if (!review) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'Review not found');
    }
    await accommodationServices.deleteReview(reviewId);
    return respondWithSuccess(res, statusCode.success, 'resource successfully deleted');
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Update an accommodation review
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const updateAccommodationReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { id: userId } = req.auth;
    const { review } = req.body;
    const userReview = await accommodationServices.findUserReview(reviewId, userId);
    if (!userReview) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'Review not found');
    }
    const updatedReview = await accommodationServices.updateReview(reviewId, review);
    return respondWithSuccess(res, statusCode.success, 'Review successfully updated', updatedReview);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Get an accommodation reviews
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getAccommodationReviews = async (req, res) => {
  try {
    const { accommodationId } = req.params;
    const accommodation = await accommodationServices.findAccomodationById(accommodationId);
    const reviews = await accommodationServices.fetchAccommodationReviews(accommodation);
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', reviews);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};
