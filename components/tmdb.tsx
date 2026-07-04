"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";

interface Props {}

const Tmdb = ({}) => {
	const { data, error } = useQuery({
		queryKey: ["test-tmdb"],
		queryFn: async () => {
			const axiosClient = axios.create({
				baseURL: "https://api.themoviedb.org",
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
					Accept: "application/json",
				},
			});
			return await axiosClient.get("/3/discover/movie").then((response) => {
				return response.data;
			});
		},
	});
	console.log("Video", data);
	return <div></div>;
};

export default Tmdb;
