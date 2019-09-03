import express from 'express';
import authController from '../../controllers/authController';
import validateAuth from '../../middlewares/validateAuth';

const router = express.Router();
router.post('/signin', validateAuth.validateSigninFormData, authController.signin);

export default router;
