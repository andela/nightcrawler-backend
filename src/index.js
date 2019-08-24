import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './docs/swagger/swagger';
import { PORT } from './config/constants';
import apiRouter from './routes';
import { respondWithSuccess, respondWithWarning } from './helpers/responseHandler';

const app = express();
const port = PORT || 3000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(logger('dev'));

// handles default route
app.get('/', (req, res) => respondWithSuccess(res, 200, 'Welcome to barefoot Normad'));

app.use(apiRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// handles non-existing routes
app.all('*', (req, res) => respondWithWarning(res, 404, 'route not found'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

export default app;
