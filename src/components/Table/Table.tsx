import { useEffect, useState } from "react";
import cx from "classnames";

import { TableHeadersType, TableRowType } from "../../types";
import { TableRow } from "./components/TableRow";
import { Calendar } from "./components/Calendar";
import { formatStringToDate } from "../../helpers";

type TableProps = {
  tableHeaders: TableHeadersType;
  tableBody: TableRowType[];
  withSubHeader?: boolean;
};

export const Table: React.FC<TableProps> = ({
  tableHeaders,
  tableBody,
  withSubHeader,
}) => {
  const [data, setData] = useState<TableRowType[]>([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setData(tableBody);
  }, [tableBody]);

  const clickHandler = () => {
    setData((prevData) => [...prevData.slice().reverse()]);
    setIsSorted(!isSorted);
  };

  const filterByDate = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    const cashedData = isSorted ? [...tableBody.slice().reverse()] : tableBody;

    if (!startDate && !endDate) {
      setData(cashedData);
      return;
    }

    if (!startDate && endDate) {
      const filteredData = cashedData.filter(
        (el) =>
          formatStringToDate(el.rowTitle) <=
          new Date(endDate.setHours(0, 0, 0, 0))
      );
      setData(filteredData);
    }

    if (startDate && !endDate) {
      const filteredData = cashedData.filter(
        (el) =>
          formatStringToDate(el.rowTitle) >=
          new Date(startDate.setHours(0, 0, 0, 0))
      );
      setData(filteredData);
    }

    if (startDate && endDate) {
      const filteredData = cashedData.filter((el) => {
        return (
          formatStringToDate(el.rowTitle) >=
            new Date(startDate.setHours(0, 0, 0, 0)) &&
          formatStringToDate(el.rowTitle) <=
            new Date(endDate.setHours(0, 0, 0, 0))
        );
      });
      setData(filteredData);
    }
  };

  return (
    <>
      <Calendar callback={filterByDate} />
      <div className="overflow-auto max-h-[70vh]">
        <div className="relative inline-block min-w-full">
          <div className="sticky top-0 left-0 z-10 inline-flex w-full">
            <div className="flex-[0_0_400px] w-[400px] bg-blue-400 sticky left-0 select-none px-5 py-3 flex items-center justify-between">
              <span> Дата и время измерения </span>
              <span
                onClick={clickHandler}
                className={cx(
                  "w-10 h-10 cursor-pointer text-2xl flex justify-center items-center hover:bg-blue-700 transition-colors duration-300",
                  {
                    "-scale-y-100": !isSorted,
                  }
                )}
              >
                ^
              </span>
            </div>
            <div className="flex flex-auto flex-col">
              {withSubHeader && (
                <div className="text-center bg-blue-400 py-3"> Глубина, м</div>
              )}
              <div className="flex justify-between flex-auto">
                {tableHeaders.map((el) => (
                  <div
                    className="flex-[1_0_70px] w-[70px] bg-green-200 py-1 px-2 flex items-center"
                    key={el}
                  >
                    {el}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {data.map((row) => {
              return (
                <TableRow key={row.id} row={row} tableHeaders={tableHeaders} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
