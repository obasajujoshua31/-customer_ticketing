import { requestPaginationQuery } from './../utils/pagination';
import { tryAsync } from '../utils/global';
import {
  createdResponse,
  badRequest,
  successResponse,
  notAuthorized,
  notFound,
} from '../utils/http';
import { logger } from '../utils/logger';
import Request, { IRequest } from '../../database/models/request';
import { isValidId } from '../utils/validator';
import { paginationOption } from '../utils/pagination';

export const CreateRequest = () =>
  tryAsync(async (req, res) => {
    const { description } = req.body;

    const request = new Request({
      description,
      customerId: req.user._id,
    });

    const savedRequest = await request.save();
    logger.log({
      level: 'info',
      message: 'request created',
      data: savedRequest,
    });

    return createdResponse(res, savedRequest);
  });

export const GetLoggedInUserRequests = () =>
  tryAsync(async (req, res) => {
    const { _id: customerId } = req.user;
    const { limit, offset } = requestPaginationQuery(req);

    const requestPromise = Request.find({ customerId })
      .limit(limit)
      .skip(offset);

    const countPromise = Request.countDocuments({
      customerId,
    });

    const [requests, requestCount] = await Promise.all([
      requestPromise,
      countPromise,
    ]);

    logger.log({
      level: 'info',
      message: 'request retrieved',
      data: requests,
    });

    const paginationQuery = paginationOption(req, requestCount);

    return successResponse(res, { requests, ...paginationQuery });
  });

export const GetAllRequests = () =>
  tryAsync(async (req, res) => {
    const { limit, offset } = requestPaginationQuery(req);

    const requestPromise = Request.find({}).limit(limit).skip(offset);

    const countPromise = Request.countDocuments({});

    const [requests, requestCount] = await Promise.all([
      requestPromise,
      countPromise,
    ]);

    const paginationQuery = paginationOption(req, requestCount);

    logger.log({
      level: 'info',
      message: 'request retrieved',
      data: requests,
    });

    return successResponse(res, { requests, ...paginationQuery });
  });

export const GetRequestById = () =>
  tryAsync(async (req, res) => {
    const { requestId } = req.params;
    if (!isValidId(requestId)) {
      logger.log({
        level: 'error',
        message: 'invalid request id',
      });
      return badRequest(res, { error: 'invalid request id' });
    }

    const request = (await Request.findById(requestId)) as IRequest;

    logger.log({
      level: 'info',
      message: 'request retrieved',
      data: request,
    });

    if (!request) {
      return notFound(res, 'request is not found');
    }

    if (request.customerId.toString() !== req.user._id.toString()) {
      logger.log({
        level: 'error',
        message: 'userid is not equal to request.customerid',
      });
      return notAuthorized(res);
    }

    return successResponse(res, request);
  });
