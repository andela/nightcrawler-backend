import { findCommentById } from '../services/commentServices';
import statusCode from '../helpers/statusCode';
import { respondWithWarning } from '../helpers/responseHandler';

export const verifyComment = async (req, res, next) => {
  const comment = await findCommentById(Number(req.params.commentId));
  return !comment ? respondWithWarning(res, statusCode.resourceNotFound, 'Trip not found') : next();
};
