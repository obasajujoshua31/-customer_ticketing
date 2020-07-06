import * as dotenv from 'dotenv';
import IConfig from './iConfig';

dotenv.config();

const { APP_PORT, DATABASE_URL, DATABASE_NAME } = process.env;

const appConfig: IConfig = {
  appPort: Number(APP_PORT),
  dbURI: DATABASE_URL,
  dbName: DATABASE_NAME,
};

export default appConfig;
