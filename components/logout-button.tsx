"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/hooks/useAuthLogout";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleLogout = async () => {
		setIsLoading(true);

		try {
			await logout();
			router.push("/auth/sign-in");
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			disabled={isLoading}
			variant="outline"
			className="px-5 cursor-pointer"
			onClick={handleLogout}
		>
			{isLoading ? "Logging out..." : "Log out"}
		</Button>
	);
}
