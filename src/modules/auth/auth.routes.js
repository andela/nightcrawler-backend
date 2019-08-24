import express from 'express';
import AuthController from './auth.controller';
import ValidateAuth from '../../middlewares/ValidateAuth';

const user = express.Router();
user.post('/signin', ValidateAuth.validateSigninFormData, AuthController.signin);

export default user;

