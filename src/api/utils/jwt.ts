import appConfig from '../../config/config';
import * as jwt from 'jsonwebtoken';

interface BearerPayload {
  userId: string;
  iat: string;
}

/**
 * @description This is responsible for generating jwt tokens
 *
 * @param {string} userId
 * @returns {string}
 */
export const generateToken = (userId: string): string =>
  jwt.sign({ userId }, appConfig.jwtSecretKey);

  /**
   * @description This is responsible for decoding jwt tokens and returning bearer payload
   *
   * @param {string} token
   * @returns {BearerPayload}
   */
  export const decodeToken = (token: string): BearerPayload =>
  jwt.verify(token, appConfig.jwtSecretKey) as BearerPayload;
