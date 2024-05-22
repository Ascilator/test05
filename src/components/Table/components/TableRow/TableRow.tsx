import { TableHeadersType, TableRowType } from "../../../../types";

type TableRowProps = {
  tableHeaders: TableHeadersType;
  row: TableRowType;
};

export const TableRow: React.FC<TableRowProps> = ({ row }) => {
  return (
    <div className="flex">
      <div className="flex-[0_0_400px] w-[400px] sticky left-0 bg-white">
        {row.rowTitle}
      </div>
      <div className="flex justify-between flex-auto">
        {row.elements.map((el) => (
          <div
            key={el.id}
            className="flex-[1_0_70px] w-[70px] bg-red-300 py-1 px-2"
          >
            {el.displayedData}
          </div>
        ))}
      </div>
    </div>
  );
};
