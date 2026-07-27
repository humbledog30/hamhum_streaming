"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
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
    
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([],)
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState<SortingState>([]);
    
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
            sorting,
        },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 20 //optionally customize the initial pagination state.
            },
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const [selected, setSelected] = useState("")
    const statusColumn = table.getColumn("status")
    const statusList = Array.from(
        new Set(data.map((row) => row.status))
    );

    const genreColumn = table.getColumn("genres")
    const genraList = Array.from(
        new Set(data.map((row) => row.genres))
    );
    const flatGenreList = genraList.flatMap((items) => items?.flatMap((item) => item.genre?.tmdb_genre_name))
    const uniqueFilteredGenreList = [...new Set(flatGenreList)].toSorted()

    const releaseDateColumn = table.getColumn("release_date")
    const releaseDateList = Array.from(
        new Set(data.map((row) => row.release_date))
    );

    // const yearAddedColumn = table.getColumn("created_at")
    // const yearAddedList = Array.from(
    //     new Set(data.map((row) => row.created_at))
    // );

    const sortValue =
        sorting.length === 0
            ? ""
            : `${sorting[0].id}-${sorting[0].desc ? "desc" : "asc"}`;

    return (
        <>
            <section className="flex flex-row justify-between my-3">
                <article className="flex flex-row items-center rounded-4xl px-2 py-1 bg-muted text-white/60">
                    <label htmlFor="all"
                        className="data-[active=true]:bg-background text-foreground rounded-4xl px-4 py-1"
                        data-active={selected == "all" || selected == ""}
                    >All</label>
                    <input type="radio" name="status_filter" id="all" value="all" hidden defaultChecked
                        onChange={(e) => {
                            statusColumn?.setFilterValue(undefined)
                            setSelected(e.currentTarget.value)
                        }}
                    />
                    {
                        statusList.map((status, index) => (
                            status ?
                            <article key={index}>
                                <label htmlFor={status}
                                    className="data-[active=true]:bg-background text-foreground rounded-4xl px-4 py-1"
                                    data-active={selected == status}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}</label>
                                <input type="radio" name="status_filter" id={status} hidden
                                    value={status}
                                    onChange={(e) => {
                                        statusColumn?.setFilterValue(e.currentTarget.value)
                                        setSelected(e.currentTarget.value)
                                    }}
                                />
                            </article>
                            :
                            "No status found!"
                        ))
                    }
                </article>

                <section className="flex flex-row gap-2">
                    <article className="flex flex-row items-center">
                        <Search className="absolute ms-2" size={16} />
                        <Input
                            type="text"
                            placeholder="Search title..."
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="ps-7"
                        />
                    </article>
                
                    <Select
                        value={(genreColumn?.getFilterValue() as string) ?? ""}
                        onValueChange={(value) =>
                            genreColumn?.setFilterValue(value === "all" ? undefined : value)
                        }
                    >
                        <SelectTrigger className="max-w-45 w-auto">
                            <SelectValue placeholder="Filter Genre" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {
                                uniqueFilteredGenreList.map((genre, index) => (
                                    genre ?
                                    <SelectItem key={index} value={genre}>{genre}</SelectItem>
                                    : ""
                                ))
                            }
                        </SelectContent>
                    </Select>

                    <Select
                        value={(releaseDateColumn?.getFilterValue() as string) ?? ""}
                        onValueChange={(value) =>
                            releaseDateColumn?.setFilterValue(value === "all" ? undefined : value)
                        }
                    >
                        <SelectTrigger className="max-w-45 w-auto">
                            <SelectValue placeholder="Filter Year" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {releaseDateList.map((year, index) => (
                                year ? <SelectItem key={index} value={year}>{year}</SelectItem> : ""
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={sortValue ?? ""}
                        onValueChange={(e) => {
                            return(
                                e != "" ?
                                    table.setSorting([{
                                        id: e.split("-")[0]?.toString(),
                                        desc: e.split("-")[1]?.toString() == "asc" ? false : true
                                    }])
                                : table.setSorting([])
                            )
                        }}
                    >
                        <SelectTrigger className="max-w-45 w-auto">
                            <SelectValue placeholder="Sort by:" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            <SelectItem value="original_title-asc">Title (A–Z)</SelectItem>
                            <SelectItem value="original_title-desc">Title (Z–A)</SelectItem>
                            <SelectItem value="genre_ids-asc">Genre (0–9)</SelectItem>
                            <SelectItem value="genre_ids-desc">Genre (9-0)</SelectItem>
                            <SelectItem value="vote_average-asc">Rating (0–9)</SelectItem>
                            <SelectItem value="vote_average-desc">Rating (9-0)</SelectItem>
                            <SelectItem value="release_date-asc">Release Date (0-9)</SelectItem>
                            <SelectItem value="release_date-desc">Release Date (9-0)</SelectItem>
                            <SelectItem value="status-asc">Status (A–Z)</SelectItem>
                            <SelectItem value="status-desc">Status (Z–A)</SelectItem>
                        </SelectContent>
                    </Select>
                </section>
            </section>

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