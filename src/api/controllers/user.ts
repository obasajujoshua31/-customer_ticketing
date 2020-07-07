import { userType } from './../utils/constants';
import { findRequestById } from './../utils/query';
import User, { IUser } from '../../database/models/user';
import Request from '../../database/models/request';

import { tryAsync } from '../utils/global';
import {
  badRequest,
  successResponse,
  notFound,
  notAuthorized,
} from '../utils/http';
import { logger } from '../utils/logger';
import { paginationOption, requestPaginationQuery } from '../utils/pagination';
import { isValidId } from '../utils/validator';

export const getAllUsers = () =>
  tryAsync(async (req, res) => {
    const { limit, offset } = requestPaginationQuery(req);

    const allUsersPromise = User.find({})
      .limit(limit)
      .skip(offset)
      .select('-password'); // -password to exclude password field

    const countPromise = User.countDocuments({});

    const [allUsers, noOfCustomers] = await Promise.all([
      allUsersPromise,
      countPromise,
    ]);

    const paginationQuery = paginationOption(req, noOfCustomers);

    return successResponse(res, { users: allUsers, ...paginationQuery });
  });

export const getUserById = () =>
  tryAsync(async (req, res) => {
    const { userId } = req.params;

    const userRequests = await Request.find({ customer: userId });

    return successResponse(res, { user: req.foundUser, request: userRequests });
  });

export const deactivateCustomerOrAgent = () =>
  tryAsync(async (req, res) => {
    const user = req.foundUser;

    if (user.accountType === userType.admin) {
      return notAuthorized(res);
    }

    const deactivatedUser = await user.deactivate();

    deactivatedUser.password = undefined;

    return successResponse(res, deactivatedUser);
  });
