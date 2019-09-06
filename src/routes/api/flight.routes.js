import { Router } from 'express';
import { addFlightDetails } from '../../controllers/flightController';
import { authenticateUserToken } from '../../middlewares/authentication';
import { validateTripId } from '../../middlewares/validateTripRequest';
import { verifyTrip } from '../../middlewares/tripMiddleware';
import { flightValidator, checkTripStatus } from '../../middlewares/flightMiddleware';


const flight = Router();

flight.post('/add/:tripId', authenticateUserToken, validateTripId, flightValidator, verifyTrip, checkTripStatus, addFlightDetails);

export default flight;
