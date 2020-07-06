import * as bcrypt from 'bcryptjs';

const BCRYPT_SALT = 10;

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(BCRYPT_SALT);
  return bcrypt.hashSync(password, salt);
};

export const isMatchPassword = (password: string, dbPassword: string) => {
  return bcrypt.compareSync(password, dbPassword);
};
