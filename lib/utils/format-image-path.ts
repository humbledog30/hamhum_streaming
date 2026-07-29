type srcSize = "original" | "w500" | "w400" | "w300" | "w200" | "w92";

export const formatImagePath = (src?: string | null, size: srcSize = "original") => {
	if (!src) {
		return "/Placeholder.jpg";
	}
	const tmdbImagePath = process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH;
	const cleaned = src.replace(/^\/+/, "");
	return `${tmdbImagePath}/${size}/${cleaned}`;
};
