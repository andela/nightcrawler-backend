import express from 'express';
import authController from './auth.controller';
import validateAuth from '../../middlewares/validateAuth';

const router = express.Router();
router.post('/signin', validateAuth.validateSigninFormData, authController.signin);

export default router;
