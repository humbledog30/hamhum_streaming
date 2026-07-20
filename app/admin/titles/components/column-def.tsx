"use client"

import { useFormatImagePath } from "@/lib/hooks/useFormatImagePath"
import { Movie } from "@/types/movie"
import { ColumnDef } from "@tanstack/react-table"
import { StarIcon } from "lucide-react"
import Image from "next/image"

interface MovieProps extends Partial<Movie>{
    date_added: string
    status: string
}

export const columns: ColumnDef<MovieProps>[] = [
  {
    accessorKey: "original_title",
    header: "Title",
    cell: ({row}) => {
        const data = row.original
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const backdrop = useFormatImagePath(data.poster_path)
        return(
            <div className="flex flex-row gap-2">
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
    accessorKey: "genre_ids",
    header: "Genres",
  },
  {
    accessorKey: "vote_average",
    header: "Rating",
    cell: ({row}) => {
        const data = row.original.vote_average
        return (
            <span className="flex flex-row items-center gap-1">
                <StarIcon color="yellow" size={16} fill="yellow"/> {data?.toPrecision(2) ?? "-"}
            </span>
        )
    }
  },
  {
    accessorKey: "date_added",
    header: "Added",
    cell({row}) {
        const data = new Date(row.original.date_added.replace("/-/g",'/'))
        return(
            new Intl.DateTimeFormat('en-PH', { dateStyle: 'long'}).format(data)
        )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell({row}) {
        const data = row.original.status
        return(
            data.charAt(0).toUpperCase() + data.slice(1)
        )
    },
  },
]