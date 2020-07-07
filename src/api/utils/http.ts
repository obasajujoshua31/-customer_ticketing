import { Request, Response } from 'express';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CREATED,
  SUCCESS,
  NOT_AUTHENTICATED,
  FORBIDDEN,
  NOTFOUND,
} from './constants';

/**
 * @description bad request with data
 *
 * @param {Response} res
 * @param {*} data
 */
export const badRequest = (res: Response, data: any) =>
  res.status(BAD_REQUEST).json(data);

/**
 * @description serverError with status code of 500
 *
 * @param {Response} res
 */
export const serverError = (res: Response) =>
  res
    .status(INTERNAL_SERVER_ERROR)
    .send('something usual happened! Please try again');

/**
 * @description This returns 201 status
 *
 * @param {Response} res
 * @param {*} data
 */
export const createdResponse = (res: Response, data: any) =>
  res.status(CREATED).json(data);

/**
 * @description This returns 200 status
 *
 * @param {Response} res
 * @param {*} data
 */
export const successResponse = (res: Response, data: any) =>
  res.status(SUCCESS).json(data);

/**
 * @description This returns 401 status
 *
 * @param {Response} res
 * @param {string} message
 */
export const notAuthenticated = (res: Response, message: string) =>
  res.status(NOT_AUTHENTICATED).json({ message });

/**
 * @description This returns 403
 *
 * @param {Response} res
 */
export const notAuthorized = (res: Response) => res.sendStatus(FORBIDDEN);

/**
 * @description This returns 404
 *
 * @param {Response} res
 * @param {string} message
 */
export const notFound = (res: Response, message: string) =>
  res.status(NOTFOUND).json({ message });
