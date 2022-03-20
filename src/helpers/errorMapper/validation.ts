import { ValidationResult } from 'fastify';
import { Error as MongooseError } from 'mongoose';
import { ResponseError, FastifyValidationError } from '../../types';
import getArrayLastElement from '../utils';

export const isValidationError = (error: Error): error is FastifyValidationError => Boolean(
  (error as FastifyValidationError).validation,
);

export const isMongooseValidationError = (error: Error): error is MongooseError.ValidationError => error.name === 'ValidationError';

const getFieldName = (f: ValidationResult) => (f.keyword === 'required' ? f.params.missingProperty as string : getArrayLastElement(f.dataPath.split('.')));

export const mapValidationError = (err: FastifyValidationError): ResponseError => ({
  statusCode: 422,
  code: 'VALIDATION_ERROR',
  message: err.message,
  details: err.validation.map((f) => ({
    field: getFieldName(f),
    message: f.message,
    error: f.keyword,
    dataPath: f.dataPath.slice(1),
    params: f.params,
  })),
});

export const mapMongooseValidationError = (err: MongooseError.ValidationError): ResponseError => ({
  statusCode: 422,
  code: 'VALIDATION_ERROR',
  message: err.message.replace(`${err.message}: `, ''),
  // details: Object.keys(err.errors).map((key) => ({
  //   field: err.errors[key].path,
  //   message: err.errors[key].message,
  //   error: err.errors[key].kind,
  // })),
});
