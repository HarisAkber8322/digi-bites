import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { observer } from "mobx-react";

interface DataGridComponentProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageSize?: number;
  pagination?: boolean;
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({
  rows,
  columns,
  pageSize,
  pagination,
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      // pageSize={pageSize}
      pagination={pagination ? true : undefined} // Convert boolean to true or leave as undefined
    />
  );
};

export default observer(DataGridComponent);
