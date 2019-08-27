import constants from '../config/constants';

module.exports = {
  development: {
    use_env_variable: true,
    url: constants.DEV_DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: true,
    url: constants.TEST_DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: true,
    url: constants.PROD_DATABASE_URL,
    dialect: 'postgres'
  }
};
