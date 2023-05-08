import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Pagination,
} from "@mui/material";
import { ICTableColumns, ICTableProps } from "./types";
import { useMemo } from "react";
import { classNames } from "src/utils/class-names";

export const CTable = ({
  name,
  columns,
  data,
  rowKey,
  pagination,
  onChange,
}: ICTableProps) => {
  const _columns = useMemo<ICTableColumns[]>(() => {
    let sticky = 0;

    return columns.map((column): ICTableColumns => {
      const width = column.width
        ? parseInt(column.width.replace("px", ""))
        : 200;

      const currentPosition = sticky;

      sticky += width;

      return {
        key: column.key,
        label: column.label ?? column.key,
        width: `${width}px`,
        sticky: column.sticky ? `${currentPosition}px` : "",
        render: (column.render ?? ((value: unknown) => value)) as any,
      };
    });
  }, [columns]);

  const render = useMemo(() => {
    if (data.length) {
      return data.map((item) => (
        <TableRow key={`${name}-${item[rowKey || "_id"]}`}>
          {_columns.map((column) => (
            <TableCell
              key={`${name}-${column["key"]}-${item[rowKey || "_id"]}`}
              className={classNames(column.sticky && "sticky bg-white z-10")}
              style={{ left: column.sticky }}
            >
              <div>{column.render(item[column.key], item)}</div>
            </TableCell>
          ))}
        </TableRow>
      ));
    }
    return (
      <TableRow>
        <TableCell
          colSpan={_columns.length}
          className="p-8 text-xl text-center"
        >
          No Data
        </TableCell>
      </TableRow>
    );
  }, [_columns, data]);

  const onPageChange = (_: any, page: number) => {
    if (pagination && onChange) {
      onChange({ ...pagination, page });
    }
  };

  const onSizeChange = (e: any) => {
    if (pagination && onChange) {
      onChange({ ...pagination, size: e.target.value });
    }
  };

  return (
    <>
      <TableContainer
        key={name}
        component={Paper}
        className="w-full overflow-auto relative"
      >
        <Table stickyHeader style={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {_columns.map(({ key, label, width, sticky }) => (
                <TableCell
                  key={`${name}${key}`}
                  className={classNames(
                    "capitalize",
                    sticky && `sticky bg-white z-10`
                  )}
                  style={{ width, left: sticky }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{render}</TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <div className="mt-2 flex justify-end items-center">
          <Pagination
            count={pagination.pages || 0}
            page={pagination.page}
            onChange={onPageChange}
          />

          {/* <TablePagination
            component={"div"}
            count={pagination.total || 0}
            page={pagination.page - 1}
            rowsPerPage={pagination.size || 10}
            onPageChange={onPageChange}
            onRowsPerPageChange={onSizeChange}
          /> */}
        </div>
      )}
    </>
  );
};
