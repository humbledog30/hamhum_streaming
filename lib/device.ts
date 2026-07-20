import { v4 as uuidv4 } from "uuid";
import { UAParser } from "ua-parser-js";

const DEVICE_ID_KEY = "device_id";

export function getDeviceId(): string {
	if (typeof window === "undefined") return "";

	let id = localStorage.getItem(DEVICE_ID_KEY);
	if (!id) {
		id = uuidv4();
		localStorage.setItem(DEVICE_ID_KEY, id);
	}
	return id;
}

async function getAndroidModel(): Promise<string | null> {
	// @ts-expect-error - not in standard TS lib types yet
	if (!navigator.userAgentData) return null;
	try {
		// @ts-expect-error
		const values = await navigator.userAgentData.getHighEntropyValues(["model"]);
		return values.model || null;
	} catch {
		return null;
	}
}

async function isBrave(): Promise<boolean> {
	// @ts-expect-error - navigator.brave isn't in standard TS lib types
	return !!(navigator.brave && (await navigator.brave.isBrave?.()));
}

export async function getDeviceLabel(): Promise<string> {
	const parser = new UAParser();
	const result = parser.getResult();

	const os = result.os.name || "Unknown OS";
	const deviceType = result.device.type;

	let browser = result.browser.name || "";
	if (await isBrave()) {
		browser = "Brave";
	}

	const highEntropyModel = await getAndroidModel();
	const vendor = result.device.vendor || "";
	const fallbackModel = result.device.model || "";
	const deviceName = highEntropyModel || [vendor, fallbackModel].filter(Boolean).join(" ");

	if (deviceType === "mobile") {
		return deviceName ? `${deviceName} — ${browser}` : `${os} phone — ${browser}`;
	}

	if (deviceType === "tablet") {
		return deviceName ? `${deviceName} — ${browser}` : `${os} tablet — ${browser}`;
	}

	return `${os} — ${browser}`;
}
