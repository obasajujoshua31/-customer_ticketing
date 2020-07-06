import * as dotenv from 'dotenv';
import IConfig from './iConfig';

dotenv.config();

const {
  APP_PORT,
  DATABASE_URL,
  DATABASE_NAME,
  NODE_ENV,
  JWT_SECRET_KEY,
} = process.env;

const appConfig: IConfig = {
  appPort: Number(APP_PORT),
  dbURI: DATABASE_URL,
  dbName: DATABASE_NAME,
  env: NODE_ENV,
  jwtSecretKey: JWT_SECRET_KEY,
};

export default appConfig;
