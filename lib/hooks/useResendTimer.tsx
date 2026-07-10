"use client";
import { useEffect, useState, useCallback, useRef } from "react";

const STORAGE_KEY = "resend-timer-expiry";
const COOLDOWN_SECONDS = 60;

export function useResendTimer() {
	const [secondsLeft, setSecondsLeft] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const tick = useCallback(() => {
		const expiry = sessionStorage.getItem(STORAGE_KEY);
		if (!expiry) {
			setSecondsLeft(0);
			return;
		}
		const remaining = Math.ceil((Number(expiry) - Date.now()) / 1000);
		if (remaining <= 0) {
			sessionStorage.removeItem(STORAGE_KEY);
			setSecondsLeft(0);
			if (intervalRef.current) clearInterval(intervalRef.current);
		} else {
			setSecondsLeft(remaining);
		}
	}, []);

	useEffect(() => {
		tick(); // sync immediately on mount in case a timer is already running
		intervalRef.current = setInterval(tick, 1000);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [tick]);

	const startTimer = useCallback(() => {
		const expiry = Date.now() + COOLDOWN_SECONDS * 1000;
		sessionStorage.setItem(STORAGE_KEY, String(expiry));
		setSecondsLeft(COOLDOWN_SECONDS);
	}, []);

	return { secondsLeft, isCanResend: secondsLeft <= 0, startTimer };
}
