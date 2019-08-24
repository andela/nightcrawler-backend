import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './docs/swagger/swagger';
<<<<<<< HEAD
<<<<<<< HEAD
import { PORT } from './config/constants';
=======
import constants from './config/constants';
import router from './modules/auth/routes';
>>>>>>> feat(user-login-endpoint):user should be able to login with a valid email and password
=======
<<<<<<< HEAD
import constants from './config/constants';
import router from './modules/auth/routes';
import constants from './config/constants';
import router from './modules/auth/routes';
=======
import { PORT } from './config/constants';
>>>>>>> beadaf6... [#167727303] Setup API documentation using swagger
=======
import { PORT } from './config/constants';
>>>>>>> beadaf6... [#167727303] Setup API documentation using swagger
>>>>>>> feat(user-login-endpoint):user should be able to login with a valid email and password

const app = express();
const port = PORT || 3000;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(logger('dev'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(router);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
