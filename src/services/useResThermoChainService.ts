import { useEffect, useState } from "react";
import { formatDate } from "../helpers";
import { ResponseCommon, TableHeadersType } from "../types";
import { ServiceResult } from "./serviceTypes";

type resThermoChainRowItemType = {
  [key: string]:
    | {
        isValid: boolean;
        value: number;
      }
    | undefined;
};

type resThermoChainRowType = {
  time: string;
  objectId: string;
  sensorType: string;
  status: boolean;
  data: resThermoChainRowItemType;
  state: string;
  criticalTemperature: number;
  minDepth: number;
  maxDepth: number;
  averageTemperature: number;
};

type ResThermoChainType = ResponseCommon & {
  data: Array<resThermoChainRowType>;
};

type ResThermoTrendType = {
  data: {
    points: {
      [key: string]: number;
    };
    startDate: string;
    criticalEndDate: string;
  };
  succeeded: boolean;
  errors: Array<unknown>;
};

type ThermoDataType = {
  resThermoChain: ResThermoChainType;
  resThermoTrend: ResThermoTrendType;
  tableThermoHeaders: TableHeadersType;
};

export const useResThermoChainService = (): ServiceResult => {
  const [thermoData, setThermoData] = useState<ThermoDataType | null>(null);

  useEffect(() => {
    fetch("https://my-api.com/data/thermochain")
      .then((e) => e.json())
      .then((data) => setThermoData(data));
  }, []);

  if (!thermoData) {
    return {
      tableHeaders: [],
      tableBody: [],
      trendLine: [],
      factLine: [],
    };
  }

  const rows = thermoData.resThermoChain.data.map((row) => {
    const elements = thermoData.tableThermoHeaders.map((tableHeader) => {
      const isColumnExist = row.data[tableHeader];

      if (!isColumnExist) {
        return {
          id: Math.random(),
          displayedData: "--",
        };
      } else {
        return {
          id: `${row.data[tableHeader]?.value}${tableHeader}`,
          displayedData: row.data[tableHeader]?.value.toFixed(2) || "",
        };
      }
    });

    return {
      id: row.time, // only this thing uniq
      rowTitle: formatDate(new Date(row.time)),
      elements,
    };
  });

  const trendLine = Object.keys(thermoData.resThermoTrend.data.points).map(
    (key) => [
      new Date(key).getTime(),
      thermoData.resThermoTrend.data.points[key],
    ]
  );

  const factLine = thermoData.resThermoChain.data.map((key) => [
    new Date(key.time).getTime(),
    key.averageTemperature,
  ]);

  return {
    tableHeaders: thermoData.tableThermoHeaders,
    tableBody: rows,
    trendLine,
    factLine,
  };
};
