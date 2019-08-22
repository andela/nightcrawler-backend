import dotenv from 'dotenv';
import constant from '../config/constants';

dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} = constant;


module.exports = {
  development: {
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    dialect: 'postgres',
  },
  test: {
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    dialect: 'postgres',
  }
};
