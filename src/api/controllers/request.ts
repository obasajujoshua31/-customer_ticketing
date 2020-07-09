import { convertToCSV } from './../utils/jsonToCsv';
import { findUserById, createComment } from './../utils/query';
import {
  userType,
  statusEnum,
  REQUEST_ACTIVE,
  REQUEST_CLOSED,
  REQUEST_CANCELLED,
} from './../utils/constants';
import { requestPaginationQuery } from './../utils/pagination';
import { tryAsync } from '../utils/global';
import queue from '../../services/queue';
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
import { IUser } from 'database/models/user';

export const CreateRequest = () =>
  tryAsync(async (req, res) => {
    const { description } = req.body;

    const request = new Request({
      description,
      customer: req.user._id,
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
    const { _id: customer } = req.user;
    const { limit, offset } = requestPaginationQuery(req);

    const requestPromise = Request.find({ customer }).limit(limit).skip(offset);

    const countPromise = Request.countDocuments({
      customer,
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
    const { request, user } = req;

    if (
      user.accountType === userType.customer.toString() &&
      request.customer._id.toString() !== user._id.toString()
    ) {
      logger.log({
        level: 'error',
        message: 'userid is not equal to request.customerid',
      });
      return notAuthorized(res);
    }

    return successResponse(res, request);
  });

export const assignRequestToAgentByAdmin = () =>
  tryAsync(async (req, res) => {
    const {
      request,
      body: { agentId },
    } = req;

    if (typeof agentId === 'undefined' || !isValidId(agentId)) {
      logger.log({
        level: 'warn',
        message: 'agent id is not valid',
      });
      return badRequest(res, 'agent id is not valid');
    }

    const agent = (await findUserById(agentId)) as IUser;
    if (!agent) {
      logger.log({
        level: 'warn',
        message: 'agent cannot be found for the id provided',
      });
      return badRequest(res, 'cannot find agent');
    }

    if (agent.isDeactivated) {
      logger.log({
        level: 'warn',
        message: 'agent account is deactivated',
      });
      return badRequest(res, 'agent account is deactivated');
    }

    if (request.customer.isDeactivated) {
      logger.log({
        level: 'warn',
        message: 'cannot process a deactivated customer request',
      });
      return badRequest(res, 'cannot process a deactivated customer request');
    }

    if (request.status !== statusEnum.PENDING) {
      logger.log({
        level: 'warn',
        message: 'cannot process non pending requests',
      });
      return badRequest(res, 'cannot process non pending requests');
    }

    await request.updateStatus(statusEnum.ACTIVE);

    const updatedRequest = await request.assignAgent(agentId);

    queue.create(REQUEST_ACTIVE, { user: request.customer, agent }).save();
    return successResponse(res, updatedRequest);
  });

export const assignRequestToAgent = () =>
  tryAsync(async (req, res) => {
    const {
      user: { _id: agentId },
      user: agent,
      request,
    } = req;

    if (request.status !== statusEnum.PENDING) {
      logger.log({
        level: 'warn',
        message: 'cannot process non pending requests',
      });
      return badRequest(res, 'cannot process non pending requests');
    }

    if (request.customer.isDeactivated) {
      logger.log({
        level: 'warn',
        message: 'cannot process a deactivated customer request',
      });
      return badRequest(res, 'cannot process a deactivated customer request');
    }

    await request.updateStatus(statusEnum.ACTIVE);

    const updatedRequest = await request.assignAgent(agentId);

    queue.create(REQUEST_ACTIVE, { user: request.customer, agent }).save();

    return successResponse(res, updatedRequest);
  });

export const closeRequest = () =>
  tryAsync(async (req, res) => {
    const {
      user,
      request,
      body: { comment = null },
    } = req;

    if (request.status !== statusEnum.ACTIVE) {
      logger.log({
        level: 'warn',
        message: 'cannot process non active requests',
      });
      return badRequest(res, 'cannot process non active requests');
    }

    if (
      user.accountType === userType.agent &&
      request.agent._id.toString() !== user._id.toString()
    ) {
      logger.log({
        level: 'warn',
        message: 'cannot close request',
      });
      return notAuthorized(res);
    }

    if (comment) {
      createComment({ content: comment, request, commentBy: user });
    }

    const updatedRequest = await request.updateStatus(statusEnum.CLOSED);

    queue.create(REQUEST_CLOSED, { user: request.customer }).save();

    return successResponse(res, updatedRequest);
  });

export const cancelRequest = () =>
  tryAsync(async (req, res) => {
    const { user, request } = req;

    if (request.status !== statusEnum.PENDING) {
      logger.log({
        level: 'warn',
        message: 'cannot cancel non pending request',
      });
      return badRequest(res, 'cannot cancel non pending requests');
    }

    if (
      user.accountType === userType.customer &&
      request.customer._id.toString() !== user._id.toString()
    ) {
      logger.log({
        level: 'warn',
        message: 'cannot cancel request',
      });
      return notAuthorized(res);
    }

    const updatedRequest = await request.updateStatus(statusEnum.CANCELLED);

    queue.create(REQUEST_CANCELLED, { user: request.customer }).save();

    return successResponse(res, updatedRequest);
  });

export const getRequestClosedInLastMonth = () =>
  tryAsync(async (req, res) => {
    const { user: agent } = req;

    const now = new Date(); // present date

    const noOfDaysRequired = 30;

    const allRequestsClosed = await Request.find({
      agent: agent.id,
      status: statusEnum.CLOSED,
      dateClosed: {
        $gte: new Date(now.setDate(now.getDate() - noOfDaysRequired)),
      },
    })
      .populate('customer', '-password')
      .exec();

    if (!allRequestsClosed.length) {
      return notFound(res, 'no requests closed for agent');
    }

    const csv = await convertToCSV(allRequestsClosed);

    res.header('Content-Type', 'text/csv');
    res.attachment(`${new Date().getTime()}.csv`);

    return res.send(csv);
  });
