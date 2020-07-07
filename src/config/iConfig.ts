export default interface IConfig {
  dbURI: string;
  appPort: number;
  dbName: string;
  env: string;
  jwtSecretKey: string;
  sendGridKey: string;
  fromEmail: string;
}
