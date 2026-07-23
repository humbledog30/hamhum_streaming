import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";
import { LayoutGrid, Search } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

interface Props {}

const TitleNotFound = ({}) => {
	const [searchKey, setSearchKey] = useState("");
	return (
		<div className="w-full flex flex-col p-5 justify-center items-center pt-20 pb-10 gap-5">
			<h1 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-semibold max-w-100 text-center">
				This <span className="text-muted-foreground italic">movie</span> isn't in the{" "}
				<span className="text-muted-foreground italic">HamHum</span> Library
			</h1>
			<p className="max-w-150 text-center text-muted-foreground my-5">
				We looked through the library and came up empty. The title may have been removed,
				renamed, or never made it to the shelf.
			</p>
			<div className="border flex items-center p-2 px-3 w-100 max-w-full rounded-md focus-within:outline focus-within:outline-primary">
				<Input
					className="flex-1 outline-0"
					value={searchKey}
					placeholder="Search movies..."
					onChange={(e) => setSearchKey(e.target.value)}
				/>
				<Button className="rounded-md">
					<Search />
				</Button>
			</div>
			<div className="flex flex-wrap justify-center gap-3 mt-5">
				<Link
					href={"/browse"}
					className="bg flex gap-2 items-center primary-btn btn h-full border p-2 px-4"
				>
					<LayoutGrid size={17} /> Browse library
				</Link>
				<Link href={"/"} className="flex gap-2 items-center btn h-full border p-1.5 px-4">
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default TitleNotFound;
