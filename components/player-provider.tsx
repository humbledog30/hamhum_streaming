"use client";
import { MovieDetailsRow } from "@/types/movie";
import { ArrowLeft, Bookmark, RotateCcw, Share2, Star, VideoOff } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
export const videoSource = [
	{
		server: "VidNest",
		source: "https://vidnest.fun/movie",
		params: "autoPlay=false",
		status: true,
	},
	{
		server: "VidLink",
		source: "https://vidlink.pro/movie",
		params: "primaryColor=5c858b&secondaryColor=1E2B2D&iconColor=ffff&icons=default&player=jw&title=true&poster=true&autoplay=false&nextbutton=false",
		status: true,
	},

	{
		server: "VidFast",
		source: "https://vidfast.vc/movie",
		params: "autoPlay=false&hideServerControls=true",
		status: true,
	},
	{
		server: "VidSrc",
		source: "https://vidsrc.to/embed/movie",
		params: "",
		status: false,
	},
	{
		server: "VsEmbed",
		source: "https://vsembed.ru/embed/movie",
		params: "",
		status: false,
	},
];
export interface VideoSourceProps {
	server: string;
	source: string;
	params: string;
	status: boolean;
}
const PlayerProvider = ({
	details,
	activeServer,
	refreshCount
}: {
	details: MovieDetailsRow | undefined;
	activeServer: VideoSourceProps;
	refreshCount: number
}) => {
	const resumeAt = "&startAt=${resumeAt}";

	return (
		<div className="section-container">
			<div className="bg-accent/30">
				<div className="mx-auto w-full max-h-175 max-w-full aspect-video">
					{details?.tmdb_id ? (
						<iframe
							src={`${activeServer.source}/${details?.tmdb_id}?${activeServer.params}&refresh=${refreshCount}`}
							width="100%"
							height="100%"
							allowFullScreen
							className="border-0"
							allow="encrypted-media"
						/>
					) : (
						<div className="flex flex-col gap-3 justify-center items-center h-full">
							<VideoOff size={40} />
							<p className="font-semibold ">Movie not found!</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PlayerProvider;
