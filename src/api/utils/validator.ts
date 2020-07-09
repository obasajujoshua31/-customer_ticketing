import { check, validationResult, ValidationChain } from 'express-validator';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { badRequest } from './http';
import { logger } from './logger';

/**
 * @description This validates request body and for error.
 * It returns badRequest if there are errors
 * and passes to the next handler if no errors.
 *
 */
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
/**
 * @description This is responsible for checking string field that
 * it satisfies the length provided or 1 if not provided
 *
 * @param {string} field
 * @param {number} [length=1]
 * @returns {ValidationChain}
 */
const stringCheck = (field: string, length: number = 1): ValidationChain =>
  check(field)
    .isLength({ min: length })
    .withMessage(`${field} requires minimum of ${length} character(s)`);

/**
 * @description This validates that register  user endpoint
 * request body is valid
 */
export const validateRegisterUser = () => [
  check('email').isEmail().withMessage('Email is not valid'),
  stringCheck('password'),
  stringCheck('name'),
  validateResponse(),
];

/**
 * @description This validates that login in user endpoint
 * request body is valid
 */
export const validateLoginUser = () => [
  check('email').isEmail().withMessage('Email is not valid'),
  stringCheck('password'),
  validateResponse(),
];

/**
 * @description This validates that the create request endpoint
 * request body is valid
 */
export const validateCreateRequest = () => [
  stringCheck('description', 5),
  validateResponse(),
];

/**
 * @description This validates that it is a valid object id. It returns true if valid
 * and false if the id is not valid
 *
 * @param {string} id
 * @returns {boolean}
 */
export const isValidId = (id: string): boolean =>
  mongoose.Types.ObjectId.isValid(id);

export const validateCreateComment = () => [
  stringCheck('comment'),
  validateResponse(),
];
