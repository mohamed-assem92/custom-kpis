import { FastifyError } from 'fastify';
import chaiHttp from 'chai-http';
import { omit } from 'lodash';
import chai from 'chai';
import KPIModel from '../src/models/KPIS';
import { ResponseError } from '../src/types';
import errorMapper from '../src/helpers/errorMapper';
import testData from './data';

import App from '../src/app';

type Validation = {
    data: FastifyError;
    result: ResponseError;
}

describe('errorMapper', () => {
  chai.use(chaiHttp);

  const app = App();

  let http;

  beforeAll(async () => {
    await app.ready();
    http = chai.request(app.server).keepOpen();
  });

  afterAll(async () => { await app.close(); });

  beforeEach(async () => {
    await KPIModel.deleteMany({});
  });
  test('Should return Validation Error', () => {
    const { errorMapper: mapper } = testData as any;
    const validation = mapper.validation as Validation;
    expect(errorMapper(validation.data)).toEqual(validation.result);
  });

  test('Should create new KPI Doc', async () => {
    const { kpiDocument: { doc } } = testData;
    const { status } = await http.post('/kpis').send(doc);
    expect(status).toEqual(201);
    const ownerDocs = await KPIModel.find({ ownerId: doc.ownerId });
    expect(ownerDocs.length).toEqual(1);
    expect(omit(ownerDocs[0].toJSON(), ['createdAt', 'updatedAt', 'id'])).toEqual(doc);
  });

  test('Should retrive KPI when providing KPI ID', async () => {
    const { kpiDocument: { doc } } = testData;
    const insertedDoc = await KPIModel.create(doc);
    const { body, status } = await http.get(`/kpis/${insertedDoc.id}`);
    expect(status).toEqual(200);
    expect(omit(body, ['createdAt', 'updatedAt', 'id'])).toEqual(doc);
  });

  test('Should Delete KPI when providing KPI ID', async () => {
    const { kpiDocument: { doc } } = testData;
    const insertedDoc = await KPIModel.create(doc);
    const ownersDocsBeforeDelete = await KPIModel.find({ ownerId: doc.ownerId });
    expect(ownersDocsBeforeDelete.length).toEqual(1);
    expect(omit(ownersDocsBeforeDelete[0].toJSON(), ['createdAt', 'updatedAt', 'id'])).toEqual(doc);
    const { status } = await http.delete(`/kpis/${insertedDoc.id}`);
    expect(status).toEqual(201);
    const ownerDocsAfterDelete = await KPIModel.find({ ownerId: doc.ownerId });
    expect(ownerDocsAfterDelete.length).toEqual(0);
  });
});
