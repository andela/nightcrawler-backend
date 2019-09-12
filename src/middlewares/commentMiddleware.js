import { findCommentById } from '../services/commentServices';
import statusCode from '../helpers/statusCode';
import { respondWithWarning } from '../helpers/responseHandler';

export const verifyComment = async (req, res, next) => {
  const comment = await findCommentById(Number(req.params.commentId));
  req.comment = comment;
  return !comment ? respondWithWarning(res, statusCode.resourceNotFound, 'Comment not found') : next();
};

export const checkVisibility = async (req, res, next) => (!req.comment.isVisible ? respondWithWarning(res, statusCode.success, 'Comment has been deleted') : next());

export const checkDeletePermission = async (req, res, next) => ((req.auth.id !== req.comment.userId) ? respondWithWarning(res, statusCode.unauthorizedAccess, 'Access denied. You don\'t have the permission to delete this comment') : next());
