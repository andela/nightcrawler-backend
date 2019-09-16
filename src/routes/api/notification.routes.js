import { Router } from 'express';
import { getNotifications } from '../../controllers/notificationController';
import {authenticateUserToken, verifyUserAccount } from '../../middlewares/authentication';

trip.get('/', authenticateUserToken, verifyUserAccount, getNotifications);

export default Router;