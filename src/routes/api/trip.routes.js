import express from 'express';
 import { oneWayTripRequest, approveTripRequest, getTripRequest, rejectTripRequest,  getTripRequests } from '../../controllers/tripController';
import { validateRequestTripForm, validateTripId } from '../../middlewares/validateTripRequest';
import { authenticateUserToken } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import { verifyTrip, checkTripStatus } from '../../middlewares/tripMiddleware';

const trip = express.Router();
trip.post('/request', authenticateUserToken, validateRequestTripForm, oneWayTripRequest);
 trip.get('/', authenticateUserToken,checkPermission('VIEW_USERS_TRIP_REQUESTS'),  getTripRequests )

trip.patch('/:tripId/approve', authenticateUserToken, validateTripId, verifyTrip, checkTripStatus, checkPermission('APPROVE_TRIP_REQUEST'), approveTripRequest);

trip.get('/:tripId/', authenticateUserToken, validateTripId, verifyTrip, checkPermission('VIEW_USERS_TRIP_REQUESTS'), getTripRequest);

trip.patch('/:tripId/reject', authenticateUserToken, validateTripId, verifyTrip, checkPermission('APPROVE_TRIP_REQUEST'), rejectTripRequest);

export default trip;
