import express from 'express';
import TripController from './trip.controller';
import ValidateRequestTrip from '../../middlewares/validateRequestTrip';
import Auth from '../../middlewares/auth';


const trip = express.Router();
trip.post('/request', Auth.authorization, Auth.verifyToken, ValidateRequestTrip.validateRequestTripForm, TripController.tripRequest);
export default trip;
