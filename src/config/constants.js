/* eslint-disable require-jsdoc */
import dotenv from 'dotenv';

dotenv.config();
const {
  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  PROD_DATABASE_URL,
  PORT,
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
};
