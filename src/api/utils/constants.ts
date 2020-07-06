export const BAD_REQUEST = 400;
export const SUCCESS = 200;
export const CREATED = 201;
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_AUTHENTICATED = 401;
export const FORBIDDEN = 403;
export const NOTFOUND = 404;
export enum userType {
  customer = 'customer',
  agent = 'agent',
  admin = 'admin',
}

export enum statusEnum {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}
