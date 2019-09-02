import express from 'express';
import * as authController from './auth.controller';
import * as authMiddleware from '../../middlewares/auth.middleware';

const router = express.Router();
router.post('/signin', authMiddleware.validateSigninFormData, authController.signin);

export default router;
