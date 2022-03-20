import { FastifyRequest } from 'fastify';
import { isValidObjectId } from 'mongoose';
import CustomError from '../helpers/customError';
import KPIModel, { KPIDocument } from '../models/KPIS';
import { KPIDocumentPartialValues } from '../types';

export const addKPI = (kpiDocument: KPIDocument) => KPIModel.create(kpiDocument);

export const getKPIS = async (filter: FastifyRequest['mongoQuery']) => KPIModel.paginate(filter.criteria,
  { ...filter.options });

export const getKPISByUserId = async (filter: FastifyRequest['mongoQuery']) => {
  const isUserExists = await KPIModel.exists({ ownerId: filter.criteria.ownerId });
  if (!isUserExists) throw new CustomError(404, 'Not_Found', 'No KPIS Available');

  return getKPIS(filter);
};

export const getOneKPI = async (kpiId: string) => {
  if (!isValidObjectId(kpiId)) throw new CustomError(422, 'Unprocessable Entity', 'Invalid ID');
  const KPIData = await KPIModel.findOne({ _id: kpiId });
  if (!KPIData) throw new CustomError(404, 'Not_Found', 'No KPI Available');

  return KPIData;
};

export const deleteUserKPIS = (ownerId: number) => KPIModel.deleteMany({ ownerId });

export const deleteUserKPIbyID = (kpiId: string) => {
  if (!isValidObjectId(kpiId)) throw new CustomError(422, 'Unprocessable Entity', 'Invalid ID');
  return KPIModel.deleteOne({
    _id: kpiId,
  });
};

export const updateUserKPIbyID = async (
  kpiId: string,
  kpiDocument: KPIDocumentPartialValues,
) => {
  if (!isValidObjectId(kpiId)) throw new CustomError(422, 'Unprocessable Entity', 'Invalid ID');
  const isKPIExists = await KPIModel.exists({ _id: kpiId });
  if (!isKPIExists) throw new CustomError(404, 'Not_Found', 'No KPI Available');
  return KPIModel.findOneAndUpdate({
    _id: kpiId,
  }, kpiDocument);
};
