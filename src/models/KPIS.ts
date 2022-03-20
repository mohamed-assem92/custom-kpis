import {
  Document, model, PaginateModel, Schema,
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { omit } from 'lodash';
import { Value } from '../types';

export interface KPIDocument extends Document {
  title: string;
  ownerId: number;
  description: string;
  xAxisTitle: string;
  yAxisTitle: string;
  values?: [Value];
  createdAt?: Date;
  updatedAt?: Date;
}

export type KPIModelType = PaginateModel<KPIDocument>;

const KPISchema = new Schema<KPIDocument, KPIModelType>(
  {
    ownerId: {
      type: Number,
      required: true,
      min: 1,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    xAxisTitle: {
      type: String,
      required: true,
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
    values: [{
      type: {
        _id: false,
        xAxisValue: {
          type: Schema.Types.Mixed,
          required: true,
        },
        yAxisValue: {
          type: Schema.Types.Mixed,
          required: true,
        },
      },
      required: false,
    }],
    __v: { type: Number, select: false },
  },
  {
    toJSON: {
      versionKey: false,
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        return omit(ret, ['_id']);
      },
    },
    timestamps: true,
  },
);

(KPISchema as Schema).plugin(mongoosePaginate);

export const KPIModel = model<KPIDocument, KPIModelType>('kpi', KPISchema);

export default KPIModel;
