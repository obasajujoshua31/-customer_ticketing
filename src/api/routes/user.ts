import { isAdmin } from './../middlewares/auth';
import { getUser } from './../middlewares/user';
import {
  getAllUsers,
  getUserById,
  deactivateCustomerOrAgent,
} from '../controllers/user';
import { Router } from 'express';

const userRouter = Router();

// users routes only for admin

userRouter.get('/', getAllUsers());
userRouter.get('/:userId', getUser, getUserById());
userRouter.put('/:userId/deactivate', getUser, deactivateCustomerOrAgent());

export default userRouter;
