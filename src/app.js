import express from 'express';
import config from './config/config.js';
import configureExpress from './config/server/express.config.js';
import { sequelize } from './services/db/models/setup.db.js';
import { devLogger } from './config/logs/logger.config.js';
import { checkConnection } from "./config/mail/nodemailer.config.js";
const SERVER_PORT = config.port;

const app = express();
configureExpress(app);

const connectWithRetry = () => {
  return sequelize.authenticate()
    .then(() => {
      devLogger.info('Connection success');
      // return sequelize.sync({ force: true, alter: true });
      return sequelize.sync();
    })
    .then(() => {
      devLogger.info('Sync models ', sequelize.models, ' done connection');
      app.listen(SERVER_PORT, () => {
        devLogger.info(`Server listen at ${SERVER_PORT}`);
        // checkConnection; // nodemailer
      });
    })
    .catch((error) => {
      devLogger.error('Connection failed', error);
      devLogger.warning('Retrying in 60 seconds... <maybe db down?>');
      return new Promise((resolve) => {
        setTimeout(resolve, 60000);
      }).then(() => connectWithRetry());
    });
};

connectWithRetry();


