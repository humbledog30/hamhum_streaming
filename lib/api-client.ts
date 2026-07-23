import axios from "axios";

export const apiTmdbClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_TMDB_API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
	},
});
