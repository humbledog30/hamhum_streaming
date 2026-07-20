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

	if (deviceType === "mobile") return `${os} phone`;
	if (deviceType === "tablet") return `${os} tablet`;
	return `${os} — ${browser}`;
}
