import express from 'express';
import * as userController from './user.controller';
import * as userMiddleware from '../../middlewares/user.middleware';

const router = express.Router();

router.get('/profile', userMiddleware.isSignedIn, userController.getAProfile);

router.post('/profile', userMiddleware.isSignedIn, userMiddleware.validateProfileDataCreate, userController.createProfile);

router.patch('/profile', userMiddleware.isSignedIn, userMiddleware.validateProfileDataUpdate, userController.updateProfile);


export default router;
