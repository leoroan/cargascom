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
      devLogger.info('Conectado a la base de datos');
    }).then(() => {
      app.listen(SERVER_PORT, () => {
        devLogger.info(`Server listen at ${SERVER_PORT}`);
      });
    })
    .catch((error) => {
      devLogger.error('No se pudo conectar a la base de datos:', error);
      devLogger.warning('re intentando en 60 segundos... <maybe db down?>');
      return new Promise((resolve) => {
        setTimeout(resolve, 60000);
      }).then(() => connectWithRetry());
    });
};

connectWithRetry();


