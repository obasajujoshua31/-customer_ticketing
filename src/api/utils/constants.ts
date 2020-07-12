export const BAD_REQUEST = 400;
export const SUCCESS = 200;
export const CREATED = 201;
export const NOCONTENT = 204;
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_AUTHENTICATED = 401;
export const FORBIDDEN = 403;
export const NOTFOUND = 404;
export const STATUS_CHANGE = 'status_changed';
export const REQUEST_ACTIVE = 'REQUEST_ACTIVE';
export const REQUEST_CLOSED = 'REQUEST_CLOSED';
export const REQUEST_CANCELLED = 'REQUEST_CANCELLED';
export const AGENT_COMMENT = 'AGENT_COMMENT';
export const CUSTOMER_COMMENT = 'CUSTOMER_COMMENT';

export enum userType {
  customer = 'customer',
  agent = 'agent',
  admin = 'admin',
}

export enum statusEnum {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}
