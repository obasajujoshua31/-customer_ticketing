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
export const badRequest = (res: Response, data: any) =>
  res.status(BAD_REQUEST).json(data);

export const serverError = (res: Response) =>
  res
    .status(INTERNAL_SERVER_ERROR)
    .send('something usual happened! Please try again');

export const createdResponse = (res: Response, data: any) =>
  res.status(CREATED).json(data);

export const successResponse = (res: Response, data: any) =>
  res.status(SUCCESS).json(data);

export const notAuthenticated = (res: Response, message: string) =>
  res.status(NOT_AUTHENTICATED).json({ message });

export const notAuthorized = (res: Response) => res.sendStatus(FORBIDDEN);

export const notFound = (res: Response, message: string) =>
  res.status(NOTFOUND).json({ message });
