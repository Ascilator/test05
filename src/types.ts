export type TableRowType = {
  id: number | string;
  rowTitle: string;
  elements: Array<{
    id: string | number;
    displayedData: string;
  }>;
};

export type TableHeadersType = Array<string | number>;

export type ResponseCommon = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  hasPrevious: boolean;
  hasNext: boolean;
  succeeded: boolean;
  errors: Array<unknown>;
};
