"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/column-def";
import { Suspense, useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { movies } from "./data/sample";
import { useRouter } from "next/navigation";

interface MovieProps extends Partial<Movie> {
	date_added: string;
	status: string;
}

export default function Page() {
	const [movieList, setMovieList] = useState<MovieProps[]>([]);
	const router = useRouter();
	useEffect(() => {
		async function getMovie() {
			const list = await movies; // sample get for server component
			setMovieList(list);
		}

		getMovie();
	}, []);

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
					<DataTable columns={columns} data={movieList} />
				</Suspense>
			</section>
		</div>
	);
}
