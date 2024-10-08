import { Stack, Typography } from "@mui/material";
import {
  MRT_ColumnDef,
  MRT_RowData,
  MaterialReactTable,
  MaterialReactTableProps,
  useMaterialReactTable,
} from "material-react-table";

type DataGridProps<T extends MRT_RowData> = {
  rows: T[];
  columns: MRT_ColumnDef<T>[];
  tableTitle?: string;
  topToolbarCustomActions?: React.ReactNode;
} & Omit<MaterialReactTableProps<T>, "data" | "columns">;

const DataGrid = <T extends MRT_RowData>({
  rows,
  columns,
  tableTitle,
  topToolbarCustomActions,
  ...props
}: DataGridProps<T>) => {
  const table = useMaterialReactTable({
    columns,
    data: rows,
    enableStickyHeader: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    muiTableBodyCellProps: {
      sx: {
        fontSize: "1rem",
      },
    },

    renderTopToolbarCustomActions: () => {
      return (
        <Stack direction="row" gap="0.5rem" alignItems="center">
          <Typography variant="h5" p="0.5rem" fontWeight="bolder">
            {tableTitle}
          </Typography>
          {topToolbarCustomActions}
        </Stack>
      );
    },
    ...props,
  });

  return <MaterialReactTable table={table} />;
};

export default DataGrid;
