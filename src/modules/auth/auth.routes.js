import express from 'express';
import AuthController from './auth.controller';
import ValidateAuth from '../../middlewares/ValidateAuth';

const router = express.Router();
router.post('/signin', ValidateAuth.validateSigninFormData, AuthController.signin);

export default router;
