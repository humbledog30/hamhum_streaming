export function formatRelativeTime(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();

	const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

	const units = [
		{ limit: 60, divisor: 1, unit: "second" },
		{ limit: 3600, divisor: 60, unit: "minute" },
		{ limit: 86400, divisor: 3600, unit: "hour" },
		{ limit: 604800, divisor: 86400, unit: "day" },
		{ limit: 2629800, divisor: 604800, unit: "week" },
		{ limit: 31557600, divisor: 2629800, unit: "month" },
		{ limit: Infinity, divisor: 31557600, unit: "year" },
	] as const;

	const rtf = new Intl.RelativeTimeFormat("en", {
		numeric: "auto",
	});

	for (const { limit, divisor, unit } of units) {
		if (Math.abs(diffInSeconds) < limit) {
			return rtf.format(
				Math.round(diffInSeconds / divisor),
				unit as Intl.RelativeTimeFormatUnit,
			);
		}
	}
	return "";
}

export const formatRuntime = (runtime: number) => {
	const hours = Math.floor(runtime / 60);
	const minutes = runtime % 60;
	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	}
	return `${minutes}m`;
};
