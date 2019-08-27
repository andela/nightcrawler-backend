/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';
import dbConfig from './dbConfig';

dotenv.config();
const {
  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  PROD_DATABASE_URL,
  PORT,
 SECRET_KEY,
  API_URL,
  NODE_ENV,
  SALT_ROUNDS

} = process.env;

export default {
  port: PORT,
  dataBase: dbConfig(DEV_DATABASE_URL, TEST_DATABASE_URL, PROD_DATABASE_URL),
  SECRET_KEY,
  API_URL,
  NODE_ENV,
  PORT,
  SALT_ROUNDS
};
