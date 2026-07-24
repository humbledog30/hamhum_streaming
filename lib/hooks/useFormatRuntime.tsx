export const useFormatRuntime = (runtime: number) => {
	const hours = Math.floor(runtime / 60);
	const minutes = runtime % 60;
	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
};
