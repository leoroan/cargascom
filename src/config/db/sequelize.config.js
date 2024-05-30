import { Sequelize } from "sequelize";
import config from '../config.js';

const database = config.db.database;
const username = config.db.user;
const password = config.db.password;
const host = config.db.host;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      trustServerCertificate: true // Necesario para conexiones locales
    }
  },
  timezone: '-03:00',
  logging: false
});

export { sequelize };