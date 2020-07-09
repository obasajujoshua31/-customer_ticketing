import {
  CreateRequest,
  GetLoggedInUserRequests,
  GetRequestById,
  GetAllRequests,
  assignRequestToAgent,
  assignRequestToAgentByAdmin,
  closeRequest,
  cancelRequest,
  getRequestClosedInLastMonth,
} from '../controllers/request';
import { validateCreateRequest } from '../utils/validator';
import { Router } from 'express';
import {
  isCustomer,
  isAgentOrAdmin,
  isAgent,
  isAdmin,
  isCustomerOrAdmin,
} from '../middlewares/auth';
import { getRequest } from '../middlewares/request';

const requestRouter = Router();


// request routes
requestRouter
  .route('/')
  .post(isCustomer, validateCreateRequest(), CreateRequest())
  .get(isCustomer, GetLoggedInUserRequests());

requestRouter.route('/all').get(isAgentOrAdmin, GetAllRequests());

requestRouter.get('/closed-last-month', isAgent, getRequestClosedInLastMonth());

requestRouter
  .route('/:requestId')
  .get(getRequest, GetRequestById())
  .put(isAgent, getRequest, assignRequestToAgent());

requestRouter.put(
  '/:requestId/admin',
  isAdmin,
  getRequest,
  assignRequestToAgentByAdmin(),
);

requestRouter
  .route('/:requestId/close')
  .put(isAgentOrAdmin, getRequest, closeRequest());

requestRouter.put(
  '/:requestId/cancel',
  isCustomerOrAdmin,
  getRequest,
  cancelRequest(),
);

export default requestRouter;
