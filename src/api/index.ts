import connectToDatabase from '../database/connection/connection';
import IConfig from '../config/iConfig';
import initMiddlewares from './middlewares';

const startServer = (appConfig: IConfig) => {
  const app = require('express')();

  initMiddlewares(app);
  connectToDatabase(appConfig.dbURI);

  app.get('/api/v1', (req, res) => {
    return res.send('Welcome');
  });

  app.listen(appConfig.appPort, () => {
    console.log('Server started at port 6000');
  });
};

export default startServer;
