"use client"

import {
  ColumnDef,
//   ColumnFiltersState,
  flexRender,
  getCoreRowModel,
//   getFilteredRowModel,
  getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MovieDetailsRow } from "@/types/movie"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends Partial<MovieDetailsRow>, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    
    // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([],)
    // const [globalFilter, setGlobalFilter] = useState('')
    // const [sorting, setSorting] = useState<SortingState>([]);
    
    const table = useReactTable({
        data,
        columns,
        state: {
            // columnFilters,
            // globalFilter,
            // sorting,
        },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 20 //optionally customize the initial pagination state.
            },
        },
        // onColumnFiltersChange: setColumnFilters,
        // onGlobalFilterChange: setGlobalFilter,
        // onSortingChange: setSorting,
        
        // getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // getSortedRowModel: getSortedRowModel(),
    })

    return (
        <>
            <section className="bg-muted rounded-md border px-2">
                <div className="overflow-hidden rounded-md">
                    <Table>
                        <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                </TableHead>
                                )
                            })}
                            </TableRow>
                        ))}
                        </TableHeader>
                        <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                                ))}
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between py-4 px-4">
                    <article className="flex items-center">
                        <h3 className="text-sm">
                            Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
                            {table.getRowCount().toLocaleString()} Rows
                        </h3>
                    </article>
                    <article className="flex flex-row items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft />
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
                            disabled={!table.getCanPreviousPage()}
                            hidden={table.getState().pagination.pageIndex == 0}
                        >
                            {table.getState().pagination.pageIndex}
                        </Button>

                        <Button
                            // variant="outline"
                            size="sm"
                            className="bg-primary"
                        >
                            {table.getState().pagination.pageIndex + 1}
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
                            disabled={!table.getCanNextPage()}
                            hidden={!table.getCanNextPage()}
                        >
                            {table.getState().pagination.pageIndex + 2}
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight />
                        </Button>

                        <Select onValueChange={e => {
                                table.setPageSize(Number(e))
                            }}
                            defaultValue={table.getState().pagination.pageSize.toString()}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={`Show ${table.getState().pagination.pageSize}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 15, 20, 25,].map(pageSize => (
                                <SelectItem
                                    key={pageSize}
                                    value={pageSize.toString()}
                                >
                                    Show {pageSize}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </article>
                </div>
            </section>
        </>
    )
}