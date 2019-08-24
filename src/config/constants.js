import dotenv from 'dotenv';
import dbConfig from './dbConfig';

dotenv.config();
const {

  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  PROD_DATABASE_URL,
  PORT,
  NODE_ENV,
  SECRET_KEY,
  API_URL
} = process.env;

export default {
  port: PORT,
  dataBase: dbConfig(DEV_DATABASE_URL, TEST_DATABASE_URL, PROD_DATABASE_URL),
  SECRET_KEY,
  API_UR,
  NODE_ENV,
  PORT,
  SALT_ROUNDS,
} 

