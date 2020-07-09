import { Router } from 'express';
import authRouter from './auth';
import requestRouter from './request';
import { verifyUser } from '../middlewares/auth';
import userRouter from './user';
import { getRequest } from '../middlewares/request';
import commentRouter from './comment';

const appRouter = Router();

// main app router
appRouter.use('/auth', authRouter);
appRouter.use('/requests', verifyUser, requestRouter);
appRouter.use('/users', verifyUser, userRouter);
appRouter.use(
  '/requests/:requestId/comments',
  verifyUser,
  getRequest,
  commentRouter,
);
export default appRouter;
