import { Router } from 'express';
import { signin } from '../../controllers/authController';
import { validateSigninFormData } from '../../middlewares/validateAuth';
import { validUser } from '../../middlewares/authentication';

const router = Router();
router.post('/signin', validateSigninFormData, validUser, signin);

export default router;
