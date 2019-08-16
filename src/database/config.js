import { Pool } from 'pg';
import constants from '../config/constants';

const {
  DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD,
  DB_PORT, DB_MAX, DB_IDLE_TIMEOUT_MILLISECONDS
} = constants;
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: DB_MAX,
  idleTimeoutMillis: DB_IDLE_TIMEOUT_MILLISECONDS
});

export default config;
