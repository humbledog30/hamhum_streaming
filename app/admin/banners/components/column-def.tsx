"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatImagePath } from "@/lib/utils/format-image-path";
import { MovieDetailsRow } from "@/types/movie";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<MovieDetailsRow>[] = [
	{
		accessorKey: "id",
		header: "Order",
		cell({ row }) {
			const data = row.index + 1;  // Temp ID as ID provided in the DB uses UUID
			if (data) {
				return data;
			}
			return "N/A";
		},
	},
	{
		accessorKey: "original_title",
		header: "Title",
		cell: ({ row }) => {
			const data = row.original;
			const backdrop = formatImagePath(data.backdrop_path);
			return (
				<div className="flex flex-row gap-3">
					<Image
						src={backdrop}
						alt=""
						width={90}
						height={60}
						className="object-contain rounded-md"
					/>
					<div className="flex flex-col justify-center">
						<p>{data.title}</p>
						<p className="flex text-muted-foreground gap-1">
							<span>{data.release_date?.split("-")[0]}</span>
							<span>{"1h 46m"}</span>
						</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "genres",
		header: "Type",
		cell: ({ row }) => {
			if (row.original.genres) {
				const data = row.original.genres;
				const filtered = data?.flatMap((items) => items.genre?.tmdb_genre_name);
				return filtered[0];
			}
			return "N/A";
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell({ row }) {
			const data = row.original.id;
			const isActive = row.original.original_title?.includes("The")
			if (data) {
				return (
					<span className="flex flex-row items-center gap-2">
						<Switch id={data.toString()} checked={isActive} onCheckedChange={() => ""} />
						<label htmlFor={data.toString()}>{isActive ? "Active" : "Inactive"}</label>
					</span>
				);
			}
		},
	},
	{
		id: "actions",
		cell({ row }) {
			const data = row.original.id;
			if (data) {
				return (
					<article className="flex flex-row gap-2">
						<Button className="primary-btn p-2 rounded-md" onClick={() => alert("Update: " + data)}><SquarePen size={16} /></Button>
						<Button className="primary-btn p-2 rounded-md" onClick={() => alert("Delete" + data)}><Trash2 size={16} /></Button>
					</article>
				)
			}
			return "N/A";
		},
	},
];
