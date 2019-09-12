import { createComment, deleteCommentById, fetchTripComments } from '../services/commentServices';
import statusCode from '../helpers/statusCode';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import { commentEmitter } from '../helpers/notificationHandler';
import { findTripById, findUserTrip, getRequesterEmail } from '../services/tripServices';


/**
 * Create a new Comment
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} comment object
 */
export const createTripComment = async (req, res) => {
  const data = {
    tripId: Number(req.params.tripId),
    userId: req.auth.id,
    comment: req.body.comment
  };
  try {
    const comment = await createComment(data);

    // get the reason of the trip as title for the notification
    const tripReason = await findTripById(Number(req.params.tripId));

    const { userId, reason } = tripReason.toJSON();
    // check if the comment was sent from the manager or the staff
    const senderRole = (Number(userId) !== req.auth.id) ? 'Manager' : null;

    // get requester email
    const requesterEmail = await getRequesterEmail(Number(userId));

    // generate payload to be sent to the frontend
    const payload = {
      ...comment.toJSON(), type: 'Trip Comment', title: 'Trip Comment ', message: `A comment was made on ${reason}`, sender: senderRole, requester: requesterEmail
    };

    // Emmit the payload
    commentEmitter(payload);

    return respondWithSuccess(res, statusCode.created, 'Comment has been created successfully', comment.toJSON());
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};

/**
 * Delete a Comment
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} response object
 */
export const removeComment = async (req, res) => {
  try {
    const id = parseInt(req.params.commentId, 10);
    await deleteCommentById(id);
    return respondWithSuccess(res, statusCode.success, 'Comment has been deleted successfully');
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};

/**
* get a user trip comments
* @param {object} req
* @param {object} res
* @param {Function} next
* @returns {object} json response
*/
export const getUserTripComments = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const { id, roleId } = req.auth;
    if (roleId === 6) {
      const trip = await findUserTrip(Number(tripId), id);
      if (!trip.length) {
        return respondWithWarning(res, statusCode.resourceNotFound, 'Trip not found');
      }
      const data = await fetchTripComments(trip);
      return respondWithSuccess(res, statusCode.success, 'Data retrieved successfully', data);
    }
    return next();
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
};

/**
* get a trip comments
* @param {object} req
* @param {object} res
* @returns {object} json response
*/
export const getTripComments = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await findTripById(Number(tripId));
    const data = await fetchTripComments(trip);
    return respondWithSuccess(res, statusCode.success, 'Data retrieved successfully', data);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, error.message);
  }
};
