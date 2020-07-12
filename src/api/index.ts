import connectToDatabase from '../database/connection/connection';
import IConfig from '../config/iConfig';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import initMiddlewares from './middlewares';
import appRouter from '../api/routes';
import swaggerDoc from '../swagger.json';

/**
 * @description This starts the server with appConfig
 *
 * @param {IConfig} appConfig
 * @returns {void}
 */
const startServer = (appConfig: IConfig): void => {
  const app = express();

  initMiddlewares(app);

  connectToDatabase(appConfig);

  // set up swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  // Initialize app routes
  app.use('/api/v1', appRouter);

  app.listen(appConfig.appPort, () => {
    console.log('Server listening at ...', appConfig.appPort);
  });
};

export default startServer;
