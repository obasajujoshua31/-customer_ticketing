import { validateCreateComment } from './../utils/validator';
import {
  createCommentByAgentOrCustomer,
  getAllCommentsOnARequest,
} from './../controllers/comment';
import { Router } from 'express';

const commentRouter = Router();

// comments routes
commentRouter
  .route('/')
  .post(validateCreateComment(), createCommentByAgentOrCustomer())
  .get(getAllCommentsOnARequest());

export default commentRouter;
