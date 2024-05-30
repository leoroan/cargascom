// express-config.js
import express from 'express';
import session from 'express-session';
import handlebars from "express-handlebars";
import cors from 'cors';
import __dirname from "../../utils.js";
import { addLogger } from "../../middlewares/logger.middleware.js";
import testExtendRouter from "../../routes/aTest.router.js";

export default function configureExpress(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(addLogger);

  app.engine("hbs",
    handlebars.engine({
      extname: "hbs",
      defaultLayout: "main",
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
    })
  );

  app.set("view engine", "hbs");
  app.set("views", `${__dirname}/views`);
  app.use(express.static(`${__dirname}/public`));
  app.use(session({
    secret: 'mtInventory',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //  en producción cambia esto a true
      maxAge: 1800000
    }
  }));

  app.get('/loggerTest', (req, res) => {
    req.logger.debug('Test - DEBUG')
    req.logger.http('Test - HTTP')
    req.logger.info('Test - INFO')
    req.logger.warning('Test - WARNING')
    req.logger.error('Test - ERROR')
    req.logger.fatal('Test - FATAL')
    res.send({ status: 200, message: 'Logger test' })
  })

  //routes here, before *
  const testApi = new testExtendRouter();
  app.use("/api/test/", testApi.getRouter());


  app.get('*', (req, res) => {
    req.logger.error('error 404 - HTTP')
    res.status(404).render("error404");
  });

}
