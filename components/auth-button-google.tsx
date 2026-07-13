import { createClient } from "@/lib/supabase/client";
import { NextPage } from "next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { appToast } from "./app-toast";

const GoogleAuthButton = () => {
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const searchParams = useSearchParams();

	const handleGoogleLogin = async () => {
		const supabase = createClient();
		setIsGoogleLoading(true);

		const redirectTo = searchParams.get("redirect");
		const safeRedirect =
			redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
				? redirectTo
				: "/";

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(safeRedirect)}`,
				},
			});
			if (error) throw error;
		} catch (error: unknown) {
			appToast.error(error instanceof Error ? error.message : "An error occurred");
			setIsGoogleLoading(false);
		}
	};

	return (
		<Button
			type="button"
			variant="outline"
			className="w-full py-5 flex items-center gap-2 hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-300"
			onClick={handleGoogleLogin}
			disabled={isGoogleLoading}
		>
			<Icon icon="logos:google-icon" />
			{isGoogleLoading ? "Redirecting..." : "Continue with Google"}
		</Button>
	);
};

export default GoogleAuthButton;
