/* eslint-disable max-len */
import Model from '../models';
import * as accommodationServices from '../services/accommodationServices';
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
      return respondWithWarning(res, statusCode.resourceNotFound, 'this ccommodation does not exist');
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
    const accommodations = await accommodationServices.findAllAccommodations();
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
    const accommodations = await accommodationServices.findOneAccommodation(parseInt(accommodationId, 10));
    if (!accommodations) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'resource not found');
    }
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', accommodations.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};
