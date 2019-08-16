import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import constants from './config/constants';

const app = express();
const port  = constants.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
