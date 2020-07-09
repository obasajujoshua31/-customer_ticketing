import {
  isAgentOrAdmin,
  isCustomerOrAgent,
  isCustomerOrAdmin,
} from './../auth';
import {
  NOT_AUTHENTICATED,
  userType,
  FORBIDDEN,
} from './../../utils/constants';
import { verifyUser, isCustomer, isAgent, isAdmin } from '../auth';
import { mockReq, mockRes } from 'sinon-express-mock';
import User from '../../../database/models/user';
import sinon from 'sinon';
import sinonMongoose from 'sinon-mongoose';
import { generateToken } from '../../utils/jwt';
import config from '../../../config/config';
import connectToDatabase from '../../../database/connection/connection';

const mockId = '123456';

describe('Test Auth middleware', () => {
  describe('verify user test', () => {
    it('return notauthenticated for no bearer specified', () => {
      const request = mockReq({ headers: { Authorization: '' } });
      const response = mockRes();
      const mockNext = jest.fn();

      const respStatusCodeSpy = jest.spyOn(response, 'status');

      verifyUser(request, response, mockNext);
      expect(respStatusCodeSpy).toHaveBeenCalledWith(NOT_AUTHENTICATED);
    });

    it('return notauthenticated for no bearer specified returns 401', () => {
      const request = mockReq({ headers: { Authorization: '123456' } });
      const response = mockRes();
      const mockNext = jest.fn();

      const respStatusCodeSpy = jest.spyOn(response, 'status');

      verifyUser(request, response, mockNext);
      expect(respStatusCodeSpy).toHaveBeenCalledWith(NOT_AUTHENTICATED);
    });

    it('return notauthenticated for no bearer specified returns 401', () => {
      const request = mockReq({
        headers: {
          authorization: generateToken(mockId),
        },
      });
      const response = mockRes();
      const mockNext = jest.fn();

      const respStatusCodeSpy = jest.spyOn(response, 'status');

      verifyUser(request, response, mockNext);
      expect(respStatusCodeSpy).toHaveBeenCalledWith(NOT_AUTHENTICATED);
    });
  });

  describe('authorization middlewares', () => {
    it('is customer  should call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.customer,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();

      isCustomer(request, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('is customer  should call not call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.agent,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();
      const statusRespSpy = jest.spyOn(mockResp, 'sendStatus');

      isCustomer(request, mockResp, mockNext);
      expect(statusRespSpy).toHaveBeenCalledWith(FORBIDDEN);
    });

    it('is agent  should call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.agent,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();

      isAgent(request, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('is agent  should not call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.customer,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();
      const statusRespSpy = jest.spyOn(mockResp, 'sendStatus');

      isAgent(request, mockResp, mockNext);
      expect(statusRespSpy).toHaveBeenCalledWith(FORBIDDEN);
    });

    it('is admin  should call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.admin,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();

      isAdmin(request, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('is admin  should not call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.customer,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();
      const statusRespSpy = jest.spyOn(mockResp, 'sendStatus');

      isAdmin(request, mockResp, mockNext);
      expect(statusRespSpy).toHaveBeenCalledWith(FORBIDDEN);
    });

    it('is agent or admin  should call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.agent,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();

      isAgentOrAdmin(request, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('is agent or admin  should not call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.customer,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();
      const statusRespSpy = jest.spyOn(mockResp, 'sendStatus');

      isAgentOrAdmin(request, mockResp, mockNext);
      expect(statusRespSpy).toHaveBeenCalledWith(FORBIDDEN);
    });

    it('is customer or agent  should call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.agent,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();

      isCustomerOrAgent(request, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('is customer or agent  should not call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.admin,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();
      const statusRespSpy = jest.spyOn(mockResp, 'sendStatus');

      isCustomerOrAgent(request, mockResp, mockNext);
      expect(statusRespSpy).toHaveBeenCalledWith(FORBIDDEN);
    });

    it('is customer or admin  should call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.customer,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();

      isCustomerOrAdmin(request, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('is customer or admin  should not call next when user is defined', () => {
      const request = mockReq({
        user: {
          accountType: userType.agent,
        },
      });

      const mockResp = mockRes();
      const mockNext = jest.fn();
      const statusRespSpy = jest.spyOn(mockResp, 'sendStatus');

      isCustomerOrAdmin(request, mockResp, mockNext);
      expect(statusRespSpy).toHaveBeenCalledWith(FORBIDDEN);
    });
  });
});
