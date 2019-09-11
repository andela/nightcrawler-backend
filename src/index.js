import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './docs/swagger/swagger';
import { PORT } from './config/constants';
import apiRouter from './routes';
import { respondWithSuccess, respondWithWarning } from './helpers/responseHandler';
import { cloudinaryConfig } from './config/cloudinaryConfig';
import './config/passport';
import { socketConnection } from './helpers/socketIO';

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

// Handle image upload
app.use('*', cloudinaryConfig);

// handles default route
app.get('/', async (req, res) => respondWithSuccess(res, 200, 'Welcome to barefoot Normad'));

app.use(apiRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// handles non-existing routes
app.all('*', (req, res) => respondWithWarning(res, 404, 'route not found'));

const server = http.createServer(app);

socketConnection(server);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

export default app;
