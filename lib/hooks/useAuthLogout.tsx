import { createClient } from "@/lib/supabase/client";
import { getDeviceId } from "@/lib/device";

export async function logout() {
	const supabase = createClient();

	await supabase.rpc("clear_current_device", {
		p_device_id: getDeviceId(),
	});

	const { error } = await supabase.auth.signOut();

	if (error) {
		throw error;
	}
}
