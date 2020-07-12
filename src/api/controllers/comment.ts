import {
  findUserById,
  createComment,
  findCommentByRequest,
} from './../utils/query';
import {
  userType,
  statusEnum,
  REQUEST_ACTIVE,
  REQUEST_CLOSED,
  REQUEST_CANCELLED,
  AGENT_COMMENT,
} from './../utils/constants';
import { requestPaginationQuery } from './../utils/pagination';
import { tryAsync } from '../utils/global';
import queue from '../../services/queue';
import Comment from '../../database/models/comment';
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

export const createCommentByAgentOrCustomer = () =>
  tryAsync(async (req, res) => {
    const {
      user: agentOrCustomer,
      request,
      body: { comment },
    } = req;

    if (request.status !== statusEnum.ACTIVE) {
      logger.log({
        level: 'warn',
        message: 'can only comment on active request',
      });
      return badRequest(res, 'can only comment on active request');
    }

    if (agentOrCustomer.accountType === userType.customer) {
      const requestComments = await findCommentByRequest(request._id, {});

      if (!requestComments.length) {
        return badRequest(
          res,
          'customer can only comment when a support agent has commented',
        );
      }
    }

    const newComment = await createComment({
      content: comment,
      request,
      commentBy: agentOrCustomer,
    });

    queue
      .create(AGENT_COMMENT, { comment: newComment, request, agentOrCustomer })
      .save();

    return createdResponse(res, newComment);
  });

export const getAllCommentsOnARequest = () =>
  tryAsync(async (req, res) => {
    const { request } = req;

    const { limit, offset } = requestPaginationQuery(req);

    const searchQuery = { request: request._id };

    const allCommentsPromise = findCommentByRequest(request.id, {
      limit,
      offset,
    });

    const allCommentCountPromise = Comment.countDocuments(searchQuery);

    const [allComments, allCommentsCount] = await Promise.all([
      allCommentsPromise,
      allCommentCountPromise,
    ]);

    const paginationQuery = paginationOption(req, allCommentsCount);

    return successResponse(res, { comments: allComments, ...paginationQuery });
  });
