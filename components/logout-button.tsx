"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const logout = async () => {
		setIsLoading(true);
		try {
			const supabase = createClient();
			const { error } = await supabase.auth.signOut();

			if (error) throw error;

			router.push("/auth/login");
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			disabled={isLoading}
			className="rounded-2xl px-5 cursor-pointer"
			size="sm"
			variant={"outline"}
			onClick={logout}
		>
			{isLoading ? "Logging out..." : "Log out"}
		</Button>
	);
}
