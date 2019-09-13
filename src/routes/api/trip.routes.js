import { Router } from 'express';
import {
  oneWayTripRequest, approveTripRequest, getTripRequest, returnTripRequest,
  multiCityTripRequest, getAllTripRequests, rejectTripRequest, getUserTripStats, getTripStats
} from '../../controllers/tripController';
import {
  validateRequestTripForm, validateTripId, validateReturnTripForm, validateTripStatDate
} from '../../middlewares/validateTripRequest';

import { authenticateUserToken } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import { verifyTrip, checkTripStatus, verifyTripDestination } from '../../middlewares/tripMiddleware';
import { validateMultipleRequests } from '../../middlewares/validateMultipleRequests';

const trip = Router();
trip.get('/', authenticateUserToken, checkPermission('VIEW_USERS_TRIP_REQUESTS'), getAllTripRequests);
trip.post('/multicity', authenticateUserToken, validateMultipleRequests, verifyTripDestination, multiCityTripRequest);
trip.post('/oneway', authenticateUserToken, validateRequestTripForm, verifyTripDestination, oneWayTripRequest);
trip.post('/return', authenticateUserToken, validateReturnTripForm, verifyTripDestination, returnTripRequest);
trip.post('/stats', authenticateUserToken, checkPermission('VIEW_TRIP_STATS'), validateTripStatDate, getUserTripStats, getTripStats);
trip.get('/:tripId', authenticateUserToken, validateTripId, verifyTrip, checkPermission('VIEW_USERS_TRIP_REQUESTS'), getTripRequest);

trip.patch('/:tripId/approve', authenticateUserToken, validateTripId, verifyTrip, checkTripStatus, checkPermission('APPROVE_TRIP_REQUEST'), approveTripRequest);
trip.patch('/:tripId/reject', authenticateUserToken, validateTripId, verifyTrip, checkPermission('APPROVE_TRIP_REQUEST'), rejectTripRequest);
export default trip;
