export const useFormatImagePath = (src?: string | null, size: string = "original") => {
	if (!src) {
		return "/Placeholder.jpg";
	}
	const tmdbImagePath = process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH;
	const cleaned = src.replace(/^\/+/, "");
	return `${tmdbImagePath}/${size}/${cleaned}`;
};
