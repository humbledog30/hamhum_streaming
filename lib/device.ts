import { v4 as uuidv4 } from "uuid";
import { UAParser } from "ua-parser-js";
import deviceModels from "@/data/device-models.json";

const DEVICE_ID_KEY = "device_id";

type DeviceModelEntry = { brand: string; name: string };
type DeviceModelMap = Record<string, DeviceModelEntry>;

const deviceModelMap = deviceModels as DeviceModelMap;

const normalizedIndex: Record<string, DeviceModelEntry> = Object.fromEntries(
	Object.entries(deviceModelMap).map(([code, entry]) => [code.toUpperCase(), entry]),
);

export function getDeviceId(): string {
	if (typeof window === "undefined") return "";

	let id = localStorage.getItem(DEVICE_ID_KEY);
	if (!id) {
		id = uuidv4();
		localStorage.setItem(DEVICE_ID_KEY, id);
	}
	return id;
}

function lookupDeviceModel(code: string): string | null {
	return normalizedIndex[code.toUpperCase()]?.name ?? null;
}

async function getAndroidModelCode(): Promise<string | null> {
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

async function resolveAndroidMarketingName(): Promise<string | null> {
	const code = await getAndroidModelCode();
	if (!code) return null;
	return lookupDeviceModel(code) || code; // fall back to raw code if not found
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

	const marketingModel = await resolveAndroidMarketingName();
	const vendor = result.device.vendor || "";
	const fallbackModel = result.device.model || "";
	const deviceName = marketingModel || [vendor, fallbackModel].filter(Boolean).join(" ");

	if (deviceType === "mobile") {
		return deviceName ? `${deviceName} — ${browser}` : `${os} phone — ${browser}`;
	}

	if (deviceType === "tablet") {
		return deviceName ? `${deviceName} — ${browser}` : `${os} tablet — ${browser}`;
	}

	return `${os} — ${browser}`;
}
