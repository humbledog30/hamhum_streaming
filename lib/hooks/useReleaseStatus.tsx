"use client";
import { useEffect, useState } from "react";

type ReleaseStatus = {
	days: number;
	status: string;
	isReleased: boolean;
};

export const useReleaseStatus = (releaseDate: string) => {
	const [state, setState] = useState<ReleaseStatus>({
		days: 0,
		status: "",
		isReleased: false,
	});

	useEffect(() => {
		const today = new Date();
		const release = new Date(releaseDate);

		today.setHours(0, 0, 0, 0);
		release.setHours(0, 0, 0, 0);

		const diff = release.getTime() - today.getTime();
		const days = Math.ceil(diff / 86_400_000);

		if (days > 1) {
			setState({ days, status: `In ${days} days`, isReleased: false });
		} else if (days === 1) {
			setState({ days, status: "Tomorrow", isReleased: false });
		} else if (days === 0) {
			setState({ days, status: "Releases today", isReleased: false });
		} else {
			setState({ days: Math.abs(days), status: "Released", isReleased: true });
		}
	}, [releaseDate]);

	return state;
};
