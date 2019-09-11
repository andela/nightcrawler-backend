import { Router } from 'express';
import { authenticateUserToken } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import { verifyTrip } from '../../middlewares/tripMiddleware';
import { verifyComment } from '../../middlewares/commentMiddleware';
import { validatePostComment, validateDeleteParams, validateTripId } from '../../middlewares/validateTripRequest';
import { postComment, removeComment, getComments } from '../../controllers/commentController';

const router = Router();

router.post('/:tripId/comment', authenticateUserToken, validatePostComment, verifyTrip, checkPermission('CREATE_TRIP_COMMENT'), postComment);

router.delete('/:tripId/comments/:commentId', authenticateUserToken, validateDeleteParams, verifyTrip, verifyComment, checkPermission('DELETE_TRIP_COMMENT'), removeComment);

router.get('/:tripId/comments', authenticateUserToken, validateTripId, verifyTrip, checkPermission('VIEW_TRIP_COMMENT'), getComments);

export default router;
