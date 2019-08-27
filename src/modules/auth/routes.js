import express from 'express';
import authController from './auth.controller';
import ValidateAuth from '../../middlewares/ValidateAuth';

const router = express.Router();
router.post('/auth/signin', ValidateAuth.validateSigninFormData, authController.signin);

export default router;
