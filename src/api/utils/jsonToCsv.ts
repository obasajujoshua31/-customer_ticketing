import { Document } from 'mongoose';
import { parseAsync } from 'json2csv';

// CSV Template fields
const fields = [
  {
    label: 'ID',
    value: '_id',
  },
  {
    label: 'Description',
    value: 'description',
  },
  {
    label: 'DateRequested',
    value: 'dateRequested',
  },
  {
    label: 'DateClosed',
    value: 'dateClosed',
  },
  {
    // tslint:disable-next-line: quotemark
    label: "Customer's name",
    value: 'customer.name',
  },
  {
    // tslint:disable-next-line: quotemark
    label: "Customer's email",
    value: 'customer.email',
  },
];

/**
 * @description responsible for converting list of mongo db documents to csv datafile
 *
 * @param {Document[]} data
 * @returns {Promise<any>}
 */
export const convertToCSV = (data: Document[]) => {
  return new Promise((resolve, reject) => {
    return parseAsync(data, { fields })
      .then((csv) => resolve(csv))
      .catch((error) => reject(error));
  });
};
