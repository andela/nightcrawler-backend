import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import configs from '../../database/config';

dotenv.config();
let sequelize;

const env = process.env.NODE_ENV || 'development';

const config = configs[env];

if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const models = {
  User: sequelize.import('./user.model.js'),

};

export default models;
