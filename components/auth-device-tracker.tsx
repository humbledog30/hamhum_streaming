"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getDeviceId, getDeviceLabel } from "@/lib/device";
export default function AuthDeviceTracker() {
	useEffect(() => {
		const supabase = createClient();
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_IN" && session) {
				const { error } = await supabase.rpc("upsert_current_device", {
					p_device_id: getDeviceId(),
					p_device_label: await getDeviceLabel(),
					p_user_agent: navigator.userAgent,
				});

				if (error) {
					console.error("Failed to record device:", error.message);
				}
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return null;
}
