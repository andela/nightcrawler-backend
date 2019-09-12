import { Router } from 'express';
import {
  oneWayTripRequest, approveTripRequest, getTripRequest, returnTripRequest,
  multiCityTripRequest, getAllTripRequests, rejectTripRequest
} from '../../controllers/tripController';
import { validateRequestTripForm, validateTripId, validateReturnTripForm } from '../../middlewares/validateTripRequest';

import { authenticateUserToken } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import { verifyTrip, checkTripStatus, verifyTripDestination } from '../../middlewares/tripMiddleware';
import { validateMultipleRequests } from '../../middlewares/validateMultipleRequests';

const trip = Router();
trip.post('/oneway', authenticateUserToken, validateRequestTripForm, verifyTripDestination, oneWayTripRequest);
trip.post('/multicity', authenticateUserToken, validateMultipleRequests, verifyTripDestination, multiCityTripRequest);
trip.post('/return', authenticateUserToken, validateReturnTripForm, verifyTripDestination, returnTripRequest);

trip.patch('/:tripId/approve', authenticateUserToken, validateTripId, verifyTrip, checkTripStatus, checkPermission('APPROVE_TRIP_REQUEST'), approveTripRequest);
trip.get('/:tripId', authenticateUserToken, validateTripId, verifyTrip, checkPermission('VIEW_USERS_TRIP_REQUESTS'), getTripRequest);
 trip.get('/', authenticateUserToken, checkPermission('VIEW_USERS_TRIP_REQUESTS'), getAllTripRequests);
trip.patch('/:tripId/reject', authenticateUserToken, validateTripId, verifyTrip, checkPermission('APPROVE_TRIP_REQUEST'), rejectTripRequest);

export default trip;



