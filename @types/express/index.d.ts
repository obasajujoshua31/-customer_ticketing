import { IUser } from '../../src/database/models/user';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
