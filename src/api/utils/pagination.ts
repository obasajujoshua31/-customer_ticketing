import { Request } from 'express';
/**
 * @description This is the structure for each pagination result
 *
 * @interface IPage
 */
interface IPage {
  page?: number;
  limit?: number;
}

/**
 * @description This takes request object and returns limit and offset for that request
 * it uses 1 for page and 5 for limit if not query params are passed
 *
 * @param {Request} req
 */
export const requestPaginationQuery = (req: Request) => {
  let { limit = 5, page = 1 } = req.query;

  if (Number(limit) < 1) {
    limit = 5;
  }

  if (Number(page) < 1) {
    page = 1;
  }

  const offset = Number(limit) * (Number(page) - 1);
  return { offset, limit: Number(limit) };
};

/**
 * @description This accepts the request object and the total count of the documents
 * it returns the previous page, next page and the total count that was initially passed.
 *
 * @param {Request} req
 * @param {number} totalCount
 */
export const paginationOption = (req: Request, totalCount: number) => {
  const next: IPage = {};
  const previous: IPage = {};

  let { limit = 5, page = 1 } = req.query;

  if (Number(limit) < 1) {
    limit = 5;
  }

  if (Number(page) < 1) {
    page = 1;
  }

  if (Number(page) * Number(limit) < totalCount) {
    next.page = Number(page) + 1;
    next.limit = Number(limit);
  }

  if (page > 1) {
    previous.page = Number(page) - 1;
    previous.limit = Number(limit);
  }

  return { next, previous, totalCount };
};
