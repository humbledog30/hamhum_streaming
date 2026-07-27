"use client"

import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath"
import { MovieDetailsRow } from "@/types/movie"
import { ColumnDef } from "@tanstack/react-table"
import { StarIcon } from "lucide-react"
import Image from "next/image"


export const columns: ColumnDef<MovieDetailsRow>[] = [
  {
    accessorKey: "original_title",
    header: "Title",
    cell: ({row}) => {
        const data = row.original
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const backdrop = useFormatImagePath(data.poster_path)
        return(
            <div className="flex flex-row gap-3">
                <Image src={backdrop} alt="" width={60} height={90} className="object-contain" />
                <div className="flex flex-col justify-center">
                    <p>{data.title}</p>
                    <p className="flex text-muted-foreground gap-1">
                        <span>{data.release_date?.split('-')[0]}</span>
                        <span>{"1h 46m"}</span>
                    </p>
                </div>
            </div>
        )
    }
  },
  {
    accessorKey: "genres",
    header: "Genres",
    cell: ({row}) =>{
        if(row.original.genres){
            const data = row.original.genres
            const filtered = data?.flatMap((items) => items.genre?.tmdb_genre_name)
            return(
                filtered?.join(", ")
            )
        }
        return "N/A"
    },
    filterFn: (row, columnId, filterValue) => {
        const genres = row.getValue(columnId) as typeof row.original.genres;

        return genres.some(g => g.genre?.tmdb_genre_name === filterValue);
    },
  },
  {
    accessorKey: "vote_average",
    header: "Rating",
    cell: ({row}) => {
        const data = row.original.vote_average
        return (
            <span className="flex flex-row items-center gap-1">
                <StarIcon color="yellow" size={16} fill="yellow"/> {data?.toPrecision(2) ?? "0"}
            </span>
        )
    }
  },
  {
    accessorKey: "release_date",
    header: "Release Date",
    cell({row}) {
        if(row.original?.release_date){
            const data = new Date(row.original.release_date)
            return(
                new Intl.DateTimeFormat('en-PH', { dateStyle: 'long'}).format(data)
            )
        }
        return "N/A"
    },
    meta: {
        filterVariant: 'range',
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell({row}) {
        if(row.original.status){
            const data = row.original.status
            return(
                data.charAt(0).toUpperCase() + data.slice(1)
            )
        }
    },
  },
  {
    accessorKey: "created_at",
    header: "Date Added",
    cell({row}) {
        if(row.original?.created_at){
            const data = new Date(row.original.created_at)
            return(
                new Intl.DateTimeFormat('en-PH', { dateStyle: 'long'}).format(data)
            )
        }
        return "N/A"
    },
  },
]