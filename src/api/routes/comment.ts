import { validateCreateComment } from './../utils/validator';
import {
  createCommentByAgentOrCustomer,
  getAllCommentsByAgentOnARequest,
} from './../controllers/comment';
import { Router } from 'express';
import { isCustomerOrAgent } from '../middlewares/auth';
import { isAgentRequests, isCustomerRequests } from '../middlewares/request';

const commentRouter = Router();

// comments routes
commentRouter
  .route('/')
  .post(
    isCustomerOrAgent,
    isAgentRequests,
    isCustomerRequests,
    validateCreateComment(),
    createCommentByAgentOrCustomer(),
  )
  .get(
    isCustomerOrAgent,
    isAgentRequests,
    isCustomerRequests,
    getAllCommentsByAgentOnARequest(),
  );

export default commentRouter;
