/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';
import dbConfig from './dbConfig';

dotenv.config();
const {
  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  PROD_DATABASE_URL,
  PORT,
<<<<<<< HEAD
  API_URL
} = process.env;

module.exports = {
  PORT,
  API_URL,
  development: {
    url: DEV_DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: TEST_DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    url: PROD_DATABASE_URL,
    dialect: 'postgres'
  }
=======
  SECRET_KEY,
  API_URL
} = process.env;

export default {
  port: PORT,
  dataBase: dbConfig(DEV_DATABASE_URL, TEST_DATABASE_URL, PROD_DATABASE_URL),
  SECRET_KEY,
  API_URL
>>>>>>> feat(user-login-endpoint):user should be able to login with a valid email and password
};
