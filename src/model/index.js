import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../database/config';
import constants from '../config/constants';

dotenv.config();
const basename = path.basename(__filename);
const env = constants.NODE_ENV || 'development';

const config = configs[env];
let sequelize;
const db = {};
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
