import * as dotenv from 'dotenv';
import IConfig from './iConfig';

dotenv.config();

const {
  APP_PORT,
  DATABASE_URL,
  DATABASE_NAME,
  NODE_ENV,
  JWT_SECRET_KEY,
  SENDGRID_KEY,
  FROM_EMAIL,
  REDIS,
} = process.env;

const appConfig: IConfig = {
  appPort: Number(APP_PORT),
  dbURI: DATABASE_URL,
  dbName: DATABASE_NAME,
  env: NODE_ENV,
  jwtSecretKey: JWT_SECRET_KEY,
  sendGridKey: SENDGRID_KEY,
  fromEmail: FROM_EMAIL,
  redisURL: REDIS,
};

export default appConfig;
