import { Request } from 'express';

interface IPage {
  page?: number;
  limit?: number;
}

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
