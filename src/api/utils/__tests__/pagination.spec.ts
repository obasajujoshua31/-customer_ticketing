import { requestPaginationQuery, paginationOption } from '../pagination';
import { mockReq } from 'sinon-express-mock';

const mockLimit = 3;
const mockPage = 2;
const mockTotalCount = 10;

describe('Test pagination', () => {
  describe('requestpaginationquery', () => {
    it('should return offset and limit correctly', () => {
      const request = {
        query: {
          limit: mockLimit,
          page: mockPage,
        },
      };

      const req = mockReq(request);

      const { limit, offset } = requestPaginationQuery(req);

      expect(limit).toEqual(mockLimit);
      expect(offset).toEqual(3);
    });

    it('should return offset and limit correctly with negative limit and offset', () => {
      const request = {
        query: {
          limit: -3,
          page: -2,
        },
      };
      const req = mockReq(request);

      const { limit, offset } = requestPaginationQuery(req);

      expect(limit).toEqual(5);
      expect(offset).toEqual(0);
    });

    it('should return offset and limit with default request', () => {
      const req = mockReq();

      const { limit, offset } = requestPaginationQuery(req);

      expect(limit).toEqual(5);
      expect(offset).toEqual(0);
    });
  });

  describe('Pagination option', () => {
    it('it should return next, previous, totalCount', () => {
      const request = {
        query: {
          limit: mockLimit,
          page: mockPage,
        },
      };

      const { totalCount, next, previous } = paginationOption(
        mockReq(request),
        mockTotalCount
      );

      expect(totalCount).toEqual(mockTotalCount);
      expect(next.page).toEqual(mockPage + 1);
      expect(previous.page).toEqual(mockPage - 1);
    });

    it('it should return next, previous, totalCount', () => {
      const request = {
        query: {
          limit: -3,
          page: -2,
        },
      };

      const { totalCount, next, previous } = paginationOption(
        mockReq(request),
        mockTotalCount
      );

      expect(totalCount).toEqual(mockTotalCount);
      expect(next.page).toEqual(2);
      expect(next.limit).toEqual(5);
    });

    it('it should return next, previous, totalCount with default request', () => {
      const { totalCount, next, previous } = paginationOption(
        mockReq(),
        mockTotalCount
      );

      expect(totalCount).toEqual(mockTotalCount);
      expect(next.page).toEqual(2);
      expect(next.limit).toEqual(5);
    });

    it('it should return only previous, totalCount', () => {
      const request = {
        query: {
          limit: 5,
          page: 2,
        },
      };

      const { totalCount, next, previous } = paginationOption(
        mockReq(request),
        mockTotalCount
      );

      expect(totalCount).toEqual(mockTotalCount);
      expect(next.page).toBeUndefined();
      expect(next.limit).toBeUndefined();
      expect(previous.page).toEqual(1);
    });
  });
});
