export type KPIDocumentPartialValues = {
  title?: string;
  description?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
}

export type Value = {
  xAxisValue: string | number | Date;
  yAxisValue: string | number | Date;
}
