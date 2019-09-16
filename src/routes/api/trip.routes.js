import { Router } from 'express';
import {
  oneWayTripRequest, approveTripRequest, getTripRequest, returnTripRequest, searchTripRequests,
  multiCityTripRequest, getAllTripRequests, rejectTripRequest, getUserTripStats, getTripStats,
  sendNotification
} from '../../controllers/tripController';
import {
  validateRequestTripForm, validateTripId, validateReturnTripForm, validateTripStatDate,
  validateSearchQuery
} from '../../middlewares/validateTripRequest';

import { authenticateUserToken, verifyUserProfile } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import {
  verifyTrip, checkTripStatus, verifyTripDestination, getTripWithProfile
} from '../../middlewares/tripMiddleware';
import { validateMultipleRequests } from '../../middlewares/validateMultipleRequests';

const trip = Router();

trip.get('/search', authenticateUserToken, validateSearchQuery, searchTripRequests);

trip.get('/', authenticateUserToken, checkPermission('VIEW_USERS_TRIP_REQUESTS'), getAllTripRequests);
trip.post('/multicity', authenticateUserToken, checkPermission('CREATE_TRIP_REQUEST'), verifyUserProfile, validateMultipleRequests, verifyTripDestination, multiCityTripRequest);
trip.post('/oneway', authenticateUserToken, checkPermission('CREATE_TRIP_REQUEST'), verifyUserProfile, validateRequestTripForm, verifyTripDestination, oneWayTripRequest);
trip.post('/return', authenticateUserToken, checkPermission('CREATE_TRIP_REQUEST'), verifyUserProfile, validateReturnTripForm, verifyTripDestination, returnTripRequest);
trip.post('/stats', authenticateUserToken, checkPermission('VIEW_TRIP_STATS'), validateTripStatDate, getUserTripStats, getTripStats);

trip.get('/:tripId', authenticateUserToken, checkPermission('VIEW_USERS_TRIP_REQUESTS'), validateTripId, verifyTrip, getTripWithProfile, getTripRequest);
trip.patch('/:tripId/approve', authenticateUserToken, checkPermission('APPROVE_TRIP_REQUEST'), validateTripId, verifyTrip, checkTripStatus, approveTripRequest);

trip.get('/', authenticateUserToken, checkPermission('VIEW_USERS_TRIP_REQUESTS'), getAllTripRequests);

trip.patch('/:tripId/reject', authenticateUserToken, checkPermission('APPROVE_TRIP_REQUEST'), validateTripId, verifyTrip, rejectTripRequest);

export default trip;
