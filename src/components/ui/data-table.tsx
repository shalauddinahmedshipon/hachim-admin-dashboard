import{
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type RowData,
   getPaginationRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  type SortingState,
      getSortedRowModel,
} from '@tanstack/react-table';
import { Button } from './button';
import { useState } from 'react';
import { Input } from './input';


interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  filterColumnKey?: string;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  filterColumnKey
}: DataTableProps<TData>) {
   const [sorting, setSorting] = useState<SortingState>([])
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10, 
});
  const table = useReactTable({
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
     onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
   state: {
    pagination,
     columnFilters,
      sorting,
  },
  onPaginationChange: setPagination,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
     getPaginationRowModel: getPaginationRowModel(),
  
  });

  return (
    <div>
  {filterColumnKey && (
  <div className="flex items-center py-4">
    <Input
    placeholder={
  `Filter by ${table.getColumn(filterColumnKey)?.columnDef.header ?? filterColumnKey}...`
}
      value={(table.getColumn(filterColumnKey)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(filterColumnKey)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  </div>
)}
      <div className="rounded-md border">
      <table className="w-full border-collapse table-auto">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500"
              >
                No data found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
         
      </div>
    </div>
  );
}
