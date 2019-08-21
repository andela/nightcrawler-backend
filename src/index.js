import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../public/api-docs/swagger.json';
import constants from './config/constants';

const app = express();
const port = constants.PORT || 3000;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(logger('dev'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
