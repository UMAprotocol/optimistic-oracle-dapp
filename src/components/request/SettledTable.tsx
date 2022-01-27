import { FC } from "react";
import Table, { ICell, IRow, TableProps } from "components/table/Table";
import useSettledTableData from "./useSettledTableData";

const SettledTable: FC = () => {
  const { rows, headerCells } = useSettledTableData();
  return (
    <Table
      title="Resolution"
      className="SettledTable"
      rows={rows}
      headerCells={headerCells}
    />
  );
};

export default SettledTable;
