"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";
import { Search, X } from "lucide-react";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBox = () => {
	const searchParams = useSearchParams();
	const [search, setSearch] = useState(searchParams.get("q") ?? "");
	const router = useRouter();
	const handleSearch = () => {
		router.push(`/search?q=${search}`);
	};

	useEffect(() => {
		setSearch(searchParams.get("q") ?? "");
	}, [searchParams]);

	return (
		<div className="flex gap-3 focus-within:outline-2 focus-within:outline-primary/60 items-center w-full mx-auto bg-card border border-muted-foreground/50 rounded-4xl py-2 pl-4 pr-2">
			<Search size={16} className="text-muted-foreground" />

			<Input
				className="focus:outline-0 flex-1 border-0 shadow-none"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && handleSearch()}
			/>

			{search && (
				<X
					size={16}
					className="text-muted-foreground hover:text-foreground cursor-pointer transition-all"
					onClick={() => setSearch("")}
				/>
			)}
			<Button
				size="icon"
				className="rounded-full shrink-0 h-9 w-9 cursor-pointer"
				onClick={handleSearch}
			>
				<Search size={16} />
			</Button>
		</div>
	);
};

export default SearchBox;
