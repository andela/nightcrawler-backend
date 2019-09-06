import express from 'express';
import { oneWayTripRequest } from '../../controllers/tripController';
import validateRequestTripForm from '../../middlewares/validateTripRequest';
import { authenticateUserToken } from '../../middlewares/authentication';

const trip = express.Router();
trip.post('/request', authenticateUserToken, validateRequestTripForm, oneWayTripRequest);

export default trip;
