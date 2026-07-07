export const useFormatImagePath = (src: string, size: string = "original") => {
	const tmdbImagePath = process.env.NEXT_PUBLIC_TMDB_IMAGE_PATH;
	const cleaned = src.replace(/^\/+/, "");
	return `${tmdbImagePath}/${size}/${cleaned}`;
};
