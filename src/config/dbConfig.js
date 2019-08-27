const dbConfig = (DEV_DATABASE_URL, TEST_DATABASE_URL, PROD_DATABASE_URL) => ({
  development: {
    url: DEV_DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: TEST_DATABASE_URL,
    dialect: 'postgres'
  },
  production: {

    url: PROD_DATABASE_URL,
    dialect: 'postgres'
  }
}
);
export default dbConfig;
