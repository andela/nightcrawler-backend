import * as bookingServices from '../services/bookingServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import statusCode from '../helpers/statusCode';

/*
 * Function creates booking
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const createBooking = async (req, res) => {
  try {
    const data = {
      ...req.body,
      userId: req.auth.id,
    };
    const booking = await bookingServices.create(data);

    return respondWithSuccess(res, statusCode.created, 'resource successfully created', booking.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function gets all bookings
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingServices.findAllBookings();

    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', bookings);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};

/**
 * Function gets one booking
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const getOneBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingServices.findOneBooking(parseInt(bookingId, 10));
    if (!booking) {
      return respondWithWarning(res, statusCode.resourceNotFound, 'resource not found');
    }
    return respondWithSuccess(res, statusCode.success, 'resource successfully fetched', booking.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Server Error');
  }
};
