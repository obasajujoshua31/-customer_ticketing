import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CREATED,
  SUCCESS,
  NOT_AUTHENTICATED,
  FORBIDDEN,
  NOTFOUND,
} from './../constants';
import { mockRes, mockReq } from 'sinon-express-mock';
import {
  badRequest,
  serverError,
  createdResponse,
  successResponse,
  notAuthenticated,
  notAuthorized,
  notFound,
} from '../http';

const mockData = 'joshua';

describe('Http test', () => {
  it('bad request should return status code of 400', () => {
    const resp = mockRes();
    const respSpy = jest.spyOn(resp, 'json');
    const respSpyStatus = jest.spyOn(resp, 'status');

    badRequest(resp, mockData);
    expect(respSpy).toHaveBeenCalledWith(mockData);
    expect(respSpyStatus).toHaveBeenCalledWith(BAD_REQUEST);
  });

  it('Server error should be called with 500', () => {
    const resp = mockRes();
    const respSpy = jest.spyOn(resp, 'send');
    const respSpyStatus = jest.spyOn(resp, 'status');

    serverError(resp);
    expect(respSpy).toHaveBeenCalledWith(
      'something usual happened! Please try again'
    );
    expect(respSpyStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });

  it('Created response should be called with 201', () => {
    const resp = mockRes();
    const respSpy = jest.spyOn(resp, 'json');
    const respSpyStatus = jest.spyOn(resp, 'status');

    createdResponse(resp, mockData);
    expect(respSpy).toHaveBeenCalledWith(mockData);
    expect(respSpyStatus).toHaveBeenCalledWith(CREATED);
  });

  it('Success response should be called with 200', () => {
    const resp = mockRes();
    const respSpy = jest.spyOn(resp, 'json');
    const respSpyStatus = jest.spyOn(resp, 'status');

    successResponse(resp, mockData);
    expect(respSpy).toHaveBeenCalledWith(mockData);
    expect(respSpyStatus).toHaveBeenCalledWith(SUCCESS);
  });

  it('Not authenticated should be called with 401', () => {
    const resp = mockRes();
    const respSpy = jest.spyOn(resp, 'json');
    const respSpyStatus = jest.spyOn(resp, 'status');

    notAuthenticated(resp, mockData);
    expect(respSpy).toHaveBeenCalledWith({ message: mockData });
    expect(respSpyStatus).toHaveBeenCalledWith(NOT_AUTHENTICATED);
  });

  it('Not authorized should be called with 403', () => {
    const resp = mockRes();
    const respSpy = jest.spyOn(resp, 'sendStatus');

    notAuthorized(resp);
    expect(respSpy).toHaveBeenCalledWith(FORBIDDEN);
  });

  it('Not found should be called with 404', () => {
    const resp = mockRes();
    const respSpy = jest.spyOn(resp, 'json');
    const respSpyStatus = jest.spyOn(resp, 'status');

    notFound(resp, mockData);
    expect(respSpy).toHaveBeenCalledWith({ message: mockData });
    expect(respSpyStatus).toHaveBeenCalledWith(NOTFOUND);
  });
});
