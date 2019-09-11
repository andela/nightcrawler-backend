import { Router } from 'express';
import {
  oneWayTripRequest, approveTripRequest, getTripRequest, returnTripRequest
} from '../../controllers/tripController';
import { validateRequestTripForm, validateTripId, validateReturnTripForm } from '../../middlewares/validateTripRequest';

import { authenticateUserToken } from '../../middlewares/authentication';
import { checkPermission } from '../../middlewares/checkPermission';
import { verifyTrip, checkTripStatus } from '../../middlewares/tripMiddleware';

const trip = Router();
trip.post('/request', authenticateUserToken, validateRequestTripForm, oneWayTripRequest);

trip.patch('/:tripId/approve', authenticateUserToken, validateTripId, verifyTrip, checkTripStatus, checkPermission('APPROVE_TRIP_REQUEST'), approveTripRequest);

trip.get('/:tripId', authenticateUserToken, validateTripId, verifyTrip, checkPermission('VIEW_USERS_TRIP_REQUESTS'), getTripRequest);
trip.post('/return', authenticateUserToken, validateReturnTripForm, returnTripRequest);

export default trip;
