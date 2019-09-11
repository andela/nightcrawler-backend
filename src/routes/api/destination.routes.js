import { Router } from 'express';
import { destinationController } from '../../controllers/destinationController';
import { authenticateUserToken } from '../../middlewares/authentication';


const router = Router();

router.get('/', authenticateUserToken, destinationController);

export default router;
