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

export function getDeviceLabel(): string {
	const parser = new UAParser();
	const result = parser.getResult();

	const os = result.os.name || "Unknown OS";
	const deviceType = result.device.type;
	const browser = result.browser.name || "";
	const vendor = result.device.vendor || "";
	const model = result.device.model || "";

	const deviceName = [vendor, model].filter(Boolean).join(" ");

	if (deviceType === "mobile") {
		return deviceName ? `${deviceName} — ${browser}` : `${os} phone — ${browser}`;
	}

	if (deviceType === "tablet") {
		return deviceName ? `${deviceName} — ${browser}` : `${os} tablet — ${browser}`;
	}

	return `${os} — ${browser}`;
}
