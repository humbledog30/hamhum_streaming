"use client";

import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { searchClient } from "@/lib/algolia";
import { MovieDetailsRow } from "@/types/movie";
import Autocomplete from "@/components/algolia-autocomplete";

function Hit({ hit }: { hit: Omit<MovieDetailsRow, "genres" | "movie_credits"> }) {
	return <div>{hit.title}</div>;
}

export default function Search() {
	return (
		// <InstantSearch searchClient={searchClient} indexName="Movies">
		// 	<SearchBox spellCheck={true} />
		// 	<Hits hitComponent={Hit} />
		// </InstantSearch>
		<Autocomplete />
	);
}
