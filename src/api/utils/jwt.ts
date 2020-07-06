import appConfig from '../../config/config';
import * as jwt from 'jsonwebtoken';

interface BearerPayload {
  userId: string;
  iat: string;
}

export const generateToken = (userId: string) =>
  jwt.sign({ userId }, appConfig.jwtSecretKey);

export const decodeToken = (token: string) =>
  jwt.verify(token, appConfig.jwtSecretKey) as BearerPayload;
