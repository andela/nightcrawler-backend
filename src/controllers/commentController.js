import { createComment, deleteCommentById, getAllComments } from '../services/commentServices';
import statusCode from '../helpers/statusCode';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import { commentEmitter } from '../helpers/notificationHandler';
import { findTripById, getRequesterEmail } from '../services/tripServices';


/**
 * Create a new Comment
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} comment object
 */
export const postComment = async (req, res) => {
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
    const payload = { ...comment.toJSON(), type: 'Trip Comment', title: 'Trip Comment ', message: `A comment was made on ${reason}`, sender: senderRole, requester: requesterEmail };

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
 * Delete a Comment
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} response object
 */
export const getComments = async (req, res) => {
  try {
    const comments = await getAllComments(Number(req.params.tripId));
    return !comments.length ? respondWithWarning(res, statusCode.resourceNotFound, 'Comments not found')
      : respondWithSuccess(res, statusCode.success, 'Operation successful', comments);
  } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Oops something bad happened');
  }
};
