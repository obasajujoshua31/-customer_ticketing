import { Document } from 'mongoose';
import { parseAsync } from 'json2csv';

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

export const convertToCSV = (data: Document[]) => {
  return new Promise((resolve, reject) => {
    return parseAsync(data, { fields })
      .then((csv) => resolve(csv))
      .catch((error) => reject(error));
  });
};
