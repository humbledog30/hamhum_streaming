"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column-def";
import { Suspense } from "react";

import { useRouter } from "next/navigation";
import { useGetMovies } from "@/lib/services/get-movies.services";


export default function Page() {
	const router = useRouter();
	const {data: movieList, isLoading} = useGetMovies()

	if(isLoading){
		return <>Loading ngani ! ! !</>
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-5 pt-0">
			<section className="flex flex-1 flex-row size-full justify-between">
				<span>
					<h1 className="font-fraunces font-semibold text-2xl md:text-3xl mb-1">
						Titles
					</h1>
					<p className="text-sm text-muted-foreground">
						4,812 titles in your catalog — search, filter, and manage what&apos;s live.
					</p>
				</span>
				<Button className="primary-btn" onClick={() => router.push("/admin/titles/add")}>
					<Plus />
					Add Title
				</Button>
			</section>

			<section>
				<Suspense>
					{movieList ? <DataTable columns={columns} data={movieList} /> : null}
				</Suspense>
			</section>
		</div>
	);
}
