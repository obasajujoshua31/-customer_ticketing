import {
  CreateRequest,
  GetLoggedInUserRequests,
  GetRequestById,
  GetAllRequests,
} from '../controllers/request';
import { validateCreateRequest } from '../utils/validator';
import { Router, request } from 'express';
import { isCustomer, isAgentOrAdmin } from '../middlewares';

const requestRouter = Router();

requestRouter
  .route('/')
  .post(isCustomer, validateCreateRequest(), CreateRequest())
  .get(isCustomer, GetLoggedInUserRequests());

requestRouter.route('/all').get(isAgentOrAdmin, GetAllRequests());

requestRouter.route('/:requestId').get(isCustomer, GetRequestById());

export default requestRouter;
