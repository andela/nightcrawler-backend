import express from 'express';
import router from './api';

const apiRouter = express.Router();

apiRouter.use('/api', router);

export default apiRouter;
