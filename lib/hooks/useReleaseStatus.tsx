import { useMemo } from "react";

export const useReleaseStatus = (releaseDate: string, today: Date | null) => {
	return useMemo(() => {
		const release = new Date(releaseDate);
		if (today === null) {
			return {
				days: 0,
				status: "",
				isReleased: false,
			};
		}
		today.setHours(0, 0, 0, 0);
		release.setHours(0, 0, 0, 0);

		const diff = release.getTime() - today.getTime();
		const days = Math.ceil(diff / 86_400_000);

		if (days > 1) {
			return {
				days,
				status: `In ${days} days`,
				isReleased: false,
			};
		}

		if (days === 1) {
			return {
				days,
				status: "Tomorrow",
				isReleased: false,
			};
		}

		if (days === 0) {
			return {
				days,
				status: "Releases today",
				isReleased: false,
			};
		}

		return {
			days: Math.abs(days),
			status: "Released",
			isReleased: true,
		};
	}, [releaseDate]);
};
