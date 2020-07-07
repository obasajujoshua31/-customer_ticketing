import * as bcrypt from 'bcryptjs';

const BCRYPT_SALT = 10;

/**
 * @description This responsible for hashing password.
 *
 * @param {string} password
 * @returns {string}
 */
export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(BCRYPT_SALT);
  return bcrypt.hashSync(password, salt);
};

/**
 * @description this checks that hash password matches the password user inputs
 *
 * @param {string} password
 * @param {string} dbPassword
 * @returns {boolean}
 */
export const isMatchPassword = (password: string, dbPassword: string): boolean => {
  return bcrypt.compareSync(password, dbPassword);
};
