import { TableHeadersType, TableRowType } from "../types";

export type ServiceResult = {
  tableHeaders: TableHeadersType;
  tableBody: TableRowType[];
  trendLine: number[][];
  factLine: number[][];
};
