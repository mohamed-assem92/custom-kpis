import { ResponseError, MongoError } from '../../types';

export const isMongoError = (error: Error): error is MongoError => error.name === 'MongoError';

const normalizeIndexName = (idxName: string) => idxName.replace(/(_1|_index)/g, '');

export const mapMongoError = (err: MongoError): ResponseError => {
  const dupErrMsgRegEx = /collection:\s.+\.(?<collection>.+)\sindex:\s(?<index>.+)\sdup\skey:\s\{.*:\s(?<qoute>")?(?<value>.*)\k<qoute>\s\}/;
  const { groups: { collection, index, value } } = dupErrMsgRegEx.exec(err.message);
  const name = normalizeIndexName(index);
  return {
    statusCode: 409,
    code: 'DUPLICATION_ERROR',
    message: `${collection} conflict`,
    details: [
      {
        field: name,
        message: `${name} "${value}" already exists`,
      },
    ],
  };
};
