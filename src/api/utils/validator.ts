import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { badRequest } from './http';
import { logger } from './logger';

const validateResponse = () => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.log({
      level: 'error',
      message: 'bad request data',
      error: errors.array(),
    });
    return badRequest(res, errors);
  }

  return next();
};

const stringCheck = (field: string, length = 1) =>
  check(field)
    .isLength({ min: length })
    .withMessage(`${field} requires minimum of ${length} character(s)`);

export const validateRegisterUser = () => [
  check('email').isEmail().withMessage('Email is not valid'),
  stringCheck('password'),
  stringCheck('name'),
  validateResponse(),
];

export const validateLoginUser = () => [
  check('email').isEmail().withMessage('Email is not valid'),
  stringCheck('password'),
  validateResponse(),
];

export const validateCreateRequest = () => [
  stringCheck('description', 5),
  validateResponse(),
];

export const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);
