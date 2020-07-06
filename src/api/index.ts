import connectToDatabase from '../database/connection/connection';
import IConfig from '../config/iConfig';
import initMiddlewares from './middlewares';
import appRouter from '../api/routes';

const startServer = (appConfig: IConfig) => {
  const app = require('express')();

  initMiddlewares(app);

  connectToDatabase(appConfig);

  app.use('/api/v1', appRouter);

  app.listen(appConfig.appPort, () => {
    console.log('Server listening at ...', appConfig.appPort);
  });
};

export default startServer;
