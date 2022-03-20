import { isValidObjectId } from 'mongoose';
import CustomError from '../helpers/customError';
import KPIModel from '../models/KPIS';
import { Value } from '../types';

const checkKPIValidity = async (kpiId: string) => {
  if (!isValidObjectId(kpiId)) throw new CustomError(422, 'Unprocessable Entity', 'Invalid ID');
  const isKPIExists = await KPIModel.exists({ _id: kpiId });
  if (!isKPIExists) throw new CustomError(404, 'Not_Found', 'No KPI Available');
};

export const getKPIValues = async (kpiId: string) => {
  await checkKPIValidity(kpiId);
  const ValuesData = await KPIModel.findOne({ _id: kpiId }).select({
    values: 1,
  });
  if (!ValuesData) throw new CustomError(404, 'Not_Found', 'No KPI Available');
  return ValuesData;
};

export const deleteKPIValue = async (
  kpiId: string,
  xAxisValue: Value['xAxisValue'],
  yAxisValue: Value['yAxisValue'],
) => {
  await checkKPIValidity(kpiId);
  const isValueExists = await KPIModel.exists({
    values: {
      $elemMatch: { xAxisValue, yAxisValue },
    },
  });
  if (!isValueExists) throw new CustomError(404, 'Not_Found', "Value Doesn't Exists");
  return KPIModel.findOneAndUpdate(
    {
      _id: kpiId,
    },
    {
      $pull: {
        values: { xAxisValue, yAxisValue },
      },
    },
  );
};

export const addValue = async (kpiId: string, valueDocument: Value) => {
  await checkKPIValidity(kpiId);
  const isValueExists = await KPIModel.exists({
    values: {
      $elemMatch: valueDocument,
    },
  });
  if (isValueExists) throw new CustomError(409, 'Conflict', 'Value Already Exists');
  return KPIModel.findOneAndUpdate(
    {
      _id: kpiId,
    },
    {
      $addToSet: {
        values: valueDocument,
      },
    },
  );
};

export const updateValue = async (
  kpiId: string,
  xAxisValue: Value['xAxisValue'],
  yAxisValue: Value['yAxisValue'],
  valueDocument: Value,
) => {
  await checkKPIValidity(kpiId);
  const isSearchValueExists = await KPIModel.exists({
    values: {
      $elemMatch: { xAxisValue, yAxisValue },
    },
  });
  if (!isSearchValueExists) throw new CustomError(404, 'Not_Found', 'Value Doesn\'t Exists');
  const isValueExists = await KPIModel.exists({
    values: {
      $elemMatch: valueDocument,
    },
  });
  if (isValueExists) throw new CustomError(409, 'Conflict', 'Value Already Exists');
  return KPIModel.findOneAndUpdate(
    {
      _id: kpiId,
      values: {
        $elemMatch: { xAxisValue, yAxisValue },
      },
    },
    {
      $set: { 'values.$': valueDocument },
    },
  );
};
