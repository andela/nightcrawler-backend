/* eslint-disable max-len */
import express from 'express';
import { authenticateUserToken } from '../../middlewares/authentication';
import * as bookingController from '../../controllers/bookingController';
import { checkPermission } from '../../middlewares/checkPermission';
import { createBooking, getOneBooking } from '../../middlewares/bookingValidation';
import { verifyBookingRequest } from '../../middlewares/verifyBookingRequest';

const router = express.Router();

router.post('/', authenticateUserToken, checkPermission('BOOK_ACCOMODATION_FOR_TRIP'), createBooking, verifyBookingRequest, bookingController.createBooking);
router.get('/', authenticateUserToken, checkPermission('VIEW_BOOK_ACCOMODATION_FOR_TRIP'), bookingController.getAllBookings);
router.get('/user', authenticateUserToken, checkPermission('VIEW_BOOK_ACCOMODATION_FOR_TRIP'), bookingController.getUserBookings);
router.get('/:bookingId', authenticateUserToken, checkPermission('VIEW_BOOK_ACCOMODATION_FOR_TRIP'), getOneBooking, bookingController.getOneBooking);


export default router;
