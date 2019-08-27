import dotenv from 'dotenv';

dotenv.config();
const {
  NODE_ENV,
  PORT,
  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  PROD_DATABASE_URL,
  SECRET_KEY,
  API_URL,
  SALT_ROUNDS

} = process.env;

export default {
  NODE_ENV,
  PORT,
  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  PROD_DATABASE_URL,
  SECRET_KEY,
  API_URL,
  SALT_ROUNDS
};
