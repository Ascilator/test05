import { useEffect, useState } from "react";
import { formatDate } from "../helpers";
import { ResponseCommon, TableHeadersType } from "../types";
import { ServiceResult } from "./serviceTypes";

type resDeformationRowType = {
  time: string;
  objectId: string;
  sensorType: string;
  status: boolean;
  data: {
    value: number;
    isValid: boolean;
    delta: number | undefined;
  };
  state: string;
  criticalDelta: number;
};

type ResDeformationType = ResponseCommon & {
  data: Array<resDeformationRowType>;
};

type ResDeformationTrendType = {
  data: {
    points: {
      [key: string]: number;
    };
  };
};

type DeformationDataType = {
  resDeformation: ResDeformationType;
  resDeformationTrend: ResDeformationTrendType;
  tableDeformationHeaders: TableHeadersType;
};

export const useResDeformationService = (): ServiceResult => {
  const [deformationData, setDeformationData] =
    useState<DeformationDataType | null>(null);

  useEffect(() => {
    fetch("https://my-api.com/data/deformation")
      .then((e) => e.json())
      .then((data) => setDeformationData(data));
  }, []);

  if (!deformationData) {
    return {
      tableHeaders: [],
      tableBody: [],
      trendLine: [],
      factLine: [],
    };
  }

  const rows = deformationData.resDeformation.data.map((row) => {
    return {
      id: row.time,
      rowTitle: formatDate(new Date(row.time)),
      elements: [
        {
          id: `${row.data.value}${Date.now()}`,
          displayedData: row.data?.value?.toFixed(2),
        },
        {
          id: `${row.data.delta}${Date.now()}`,
          displayedData: row.data?.delta?.toFixed(2) || "--",
        },
        {
          id: `${row.data.isValid}${Date.now()}`,
          displayedData: row.data?.isValid?.toString(),
        },
      ],
    };
  });

  const trendLine = Object.entries(
    deformationData.resDeformationTrend.data.points
  ).map(([key, value]) => [new Date(key).getTime(), value]);

  const factLine = deformationData.resDeformation.data.map((el) => [
    new Date(el.time).getTime(),
    el.data.delta || 0,
  ]);

  return {
    tableHeaders: deformationData.tableDeformationHeaders,
    tableBody: rows,
    trendLine,
    factLine,
  };
};
