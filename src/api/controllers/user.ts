import { userType } from './../utils/constants';
import User from '../../database/models/user';
import Request from '../../database/models/request';
import { tryAsync } from '../utils/global';
import { successResponse, notAuthorized, noContent } from '../utils/http';
import { paginationOption, requestPaginationQuery } from '../utils/pagination';

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

    req.foundUser.password = undefined;
    const userRequests = await Request.find({ customer: userId });

    return successResponse(res, { user: req.foundUser, request: userRequests });
  });

export const deactivateCustomerOrAgent = () =>
  tryAsync(async (req, res) => {
    const user = req.foundUser;

    if (user.accountType === userType.admin) {
      return notAuthorized(res);
    }

    await user.deactivate();

    return noContent(res);
  });
