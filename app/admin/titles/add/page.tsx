"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { useSearchTmdbTitle } from "../hook/use-search-tmdb-title";
import { searchTitle } from "../title.action";
import { appToast } from "@/components/app-toast";
import { Input } from "@/components/ui/input";

import { Movie } from "@/types/movie";
import MovieGridSection from "../components/movie-grid-section";
import DialogMovie from "../components/dialog-movie";

const Page = () => {
	const [searchKey, setSearchKey] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const { data, isLoading } = useSearchTmdbTitle(searchKey);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

	const [selectedStatus, setSelectedStatus] = useState<string>("Draft");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const value = inputRef.current?.value ?? "";
		const result = await searchTitle({ search: value });
		if (!result.success) {
			appToast.error(result.fieldErrors?.search?.[0] ?? "");
			return;
		}
		setSearchKey(value);
	};
	const dataResult = data?.results ?? [];

	return (
		<div className="flex flex-1 flex-col gap-4 p-5 pt-0">
			<section className="flex flex-1 flex-row size-full justify-between">
				<div>
					<span className="uppercase text-muted-foreground text-sm">Add titles</span>
					<h1 className="font-fraunces font-semibold text-2xl md:text-3xl mb-1">
						Search TMDB
					</h1>
					<p className="text-sm text-muted-foreground">
						Find the movie you want to add, then click it to review and save.
					</p>
				</div>
			</section>

			<form
				onSubmit={handleSubmit}
				className="col-span-6 lg:col-span-5 max-w-300 flex items-center dark:bg-input/30 gap-2 rounded-md border border-input bg-background p-3 pl-5 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50"
			>
				<Search />
				<Input
					ref={inputRef}
					className="dark:bg-transparent border-0 focus-visible:border-0 focus-visible:ring-0"
					type="text"
					defaultValue={searchKey}
				/>
				<Button type="submit" className="primary-btn">
					Search
				</Button>
			</form>
			{data?.total_results ? (
				<p className="col-span-6 text-sm text-muted-foreground">
					Showing {data?.total_results} results for "{searchKey}"
				</p>
			) : null}
			<div className="col-span-6 lg:col-span-5 "></div>

			{!isLoading ? (
				<section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-3 gap-5">
					<MovieGridSection
						searchKey={searchKey}
						dataResult={dataResult}
						setSelectedMovie={setSelectedMovie}
					/>
				</section>
			) : null}
			<DialogMovie
				selectedMovie={selectedMovie}
				setSelectedMovie={setSelectedMovie}
				selectedStatus={selectedStatus}
				setSelectedStatus={setSelectedStatus}
			/>
		</div>
	);
};

export default Page;
