/* eslint-disable max-len */
import express from 'express';
import { authenticateUserToken } from '../../middlewares/authentication';
import * as accommodationController from '../../controllers/accommodationController';
import { checkPermission } from '../../middlewares/checkPermission';
import { multerUploads } from '../../middlewares/multer';
import {
  validateAccommodationId,
  createAccommodation, createRoom, getTripAccommodations, accommodationReview, verifyAccommodationReview
} from '../../middlewares/accommodationValidation';
import { verifyTrip } from '../../middlewares/tripMiddleware';
import { likeAccommodation, verifyAccommodation } from '../../middlewares/accommodationMiddleware';

const router = express.Router();

router.post('/', authenticateUserToken, checkPermission('CREATE_NEW_ACCOMODATION'), multerUploads, createAccommodation, accommodationController.createAccommodation);
router.get('/', authenticateUserToken, checkPermission('VIEW_ACCOMODATION'), accommodationController.getAccommodations);
router.get('/trips/:tripId', authenticateUserToken, checkPermission('VIEW_ACCOMODATION'), getTripAccommodations, verifyTrip, accommodationController.getTripAccommodations);
router.get('/:accommodationId', authenticateUserToken, checkPermission('VIEW_ACCOMODATION'), validateAccommodationId, accommodationController.getOneAccommodation);
router.post('/rooms/:accommodationId', authenticateUserToken, checkPermission('CREATE_ROOM'), createRoom, accommodationController.createRoom);
router.patch('/like/:accommodationId', authenticateUserToken, validateAccommodationId, verifyAccommodation, likeAccommodation, accommodationController.unlikeAccommodation);
router.get('/like/:accommodationId', authenticateUserToken, validateAccommodationId, verifyAccommodation, accommodationController.getLikeStatus);
router.get('/:accommodationId/reviews', authenticateUserToken, checkPermission('VIEW_ACCOMODATION_REVIEW'), verifyAccommodation, accommodationController.getAccommodationReviews);
router.post('/:accommodationId/reviews', authenticateUserToken, checkPermission('CREATE_ACCOMODATION_REVIEW'), verifyAccommodation, accommodationReview, accommodationController.createAccommodationReview);
router.patch('/:accommodationId/reviews/:reviewId', authenticateUserToken, checkPermission('EDIT_ACCOMODATION_REVIEW'), verifyAccommodation, verifyAccommodationReview, accommodationReview, accommodationController.updateAccommodationReview);
router.delete('/:accommodationId/reviews/:reviewId', authenticateUserToken, checkPermission('DELETE_ACCOMODATION_REVIEW'), verifyAccommodation, verifyAccommodationReview, accommodationController.deleteAccommodationReview);


export default router;
