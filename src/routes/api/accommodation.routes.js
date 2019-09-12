/* eslint-disable max-len */
import express from 'express';
import { authenticateUserToken } from '../../middlewares/authentication';
import * as accommodationController from '../../controllers/accommodationController';
import { checkPermission } from '../../middlewares/checkPermission';
import { multerUploads } from '../../middlewares/multer';
import {
  createAccommodation, createRoom, getTripAccommodations, getSingleAccommodation
} from '../../middlewares/accommodationValidation';
import { verifyTrip } from '../../middlewares/tripMiddleware';

const router = express.Router();

router.post('/', authenticateUserToken, checkPermission('CREATE_NEW_ACCOMODATION'), multerUploads, createAccommodation, accommodationController.createAccommodation);
router.get('/', authenticateUserToken, checkPermission('VIEW_ACCOMODATION'), accommodationController.getAccommodations);
router.get('/trips/:tripId', authenticateUserToken, checkPermission('VIEW_ACCOMODATION'), getTripAccommodations, verifyTrip, accommodationController.getTripAccommodations);
router.get('/:accommodationId', authenticateUserToken, checkPermission('VIEW_ACCOMODATION'), getSingleAccommodation, accommodationController.getOneAccommodation);
router.post('/rooms/:accommodationId', authenticateUserToken, checkPermission('CREATE_ROOM'), createRoom, accommodationController.createRoom);


export default router;
