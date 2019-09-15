import { Router } from 'express';
import { createAccommodationRating, getSingleAccommodationRatings } from '../../controllers/ratingController';
import { validateAccommodationId, validateAccommodationRating } from '../../middlewares/accommodationValidation';
import { authenticateUserToken } from '../../middlewares/authentication';
import { verifyAccommodation } from '../../middlewares/accommodationMiddleware';

const router = Router();

router.post('/:accommodationId/rating', authenticateUserToken, validateAccommodationRating, verifyAccommodation, createAccommodationRating);

router.get('/:accommodationId/ratings', authenticateUserToken, validateAccommodationId, verifyAccommodation, getSingleAccommodationRatings);

export default router;
