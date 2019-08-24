import constant from '../config/constants';

<<<<<<< HEAD
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
=======
const configs = constant.dataBase;
export default configs;
>>>>>>> feat(user-login-endpoint):user should be able to login with a valid email and password
