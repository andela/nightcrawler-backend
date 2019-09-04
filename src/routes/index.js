import { Router } from 'express';
import router from './api';

const apiRouter = Router();

apiRouter.use('/api', router);

export default apiRouter;
