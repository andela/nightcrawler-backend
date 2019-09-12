/* eslint-disable max-len */
import express from 'express';
import { authenticateUserToken } from '../../middlewares/authentication';
import * as bookingController from '../../controllers/bookingController';
import { checkPermission } from '../../middlewares/checkPermission';
import { createBooking, getOneBooking } from '../../middlewares/bookingValidation';
import { verifyBookingRequest } from '../../middlewares/verifyBookingRequest';
import { getUserBookings } from '../../middlewares/bookingMiddleware';

const router = express.Router();

router.post('/', authenticateUserToken, checkPermission('BOOK_ACCOMODATION_FOR_TRIP'), createBooking, verifyBookingRequest, bookingController.createBooking);
router.get('/', authenticateUserToken, checkPermission('VIEW_BOOK_ACCOMODATION_FOR_TRIP'), getUserBookings, bookingController.getBookings);
router.get('/:bookingId', authenticateUserToken, checkPermission('VIEW_BOOK_ACCOMODATION_FOR_TRIP'), getOneBooking, bookingController.getOneBooking);


export default router;
