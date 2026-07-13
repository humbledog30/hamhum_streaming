import { NextPage } from "next";
import { Button } from "./ui/button";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { appToast } from "./app-toast";

interface Props {}

const AuthButtonDiscord = ({}) => {
	const [isDiscordLoading, setIsDiscordLoading] = useState(false);
	const searchParams = useSearchParams();

	const handleDiscorSignin = async () => {
		try {
			setIsDiscordLoading(true);
			const supabase = createClient();

			const redirectTo = searchParams.get("redirect");
			const safeRedirect =
				redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
					? redirectTo
					: "/";

			const { error } = await supabase.auth.signInWithOAuth({
				provider: "discord",
				options: {
					redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(safeRedirect)}`,
				},
			});

			if (error) throw error;
		} catch (error) {
			appToast.error(error instanceof Error ? error.message : "An error occurred");
			setIsDiscordLoading(false);
		}
	};
	return (
		<Button
			type="button"
			variant="outline"
			className="w-full py-5 flex items-center gap-2 hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-300"
			onClick={handleDiscorSignin}
			disabled={isDiscordLoading}
		>
			<Icon icon="logos:discord-icon" />
			{isDiscordLoading ? "Redirecting..." : "Continue with Discord"}
		</Button>
	);
};

export default AuthButtonDiscord;
