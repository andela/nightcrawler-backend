import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST, DB_USER, DB_NAME, DB_PASSWORD,
  DB_IDLE_TIMEOUT_MILLISECONDS, DB_PORT,
  DB_MAX, PORT
} = process.env;

module.exports = {
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_MAX,
  DB_IDLE_TIMEOUT_MILLISECONDS,
  PORT
};
