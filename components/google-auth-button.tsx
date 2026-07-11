import { createClient } from "@/lib/supabase/client";
import { NextPage } from "next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

interface GoogleAuthButtonProps {
	setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const GoogleAuthButton = ({ setError }: GoogleAuthButtonProps) => {
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const searchParams = useSearchParams();

	const handleGoogleLogin = async () => {
		const supabase = createClient();
		setIsGoogleLoading(true);
		setError(null);

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
			// No router.push here — the browser redirects to Google, then back to your callback route.
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : "An error occurred");
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
			<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="#4285F4"
					d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
				/>
				<path
					fill="#34A853"
					d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
				/>
				<path
					fill="#FBBC05"
					d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"
				/>
				<path
					fill="#EA4335"
					d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
				/>
			</svg>
			{isGoogleLoading ? "Redirecting..." : "Continue with Google"}
		</Button>
	);
};

export default GoogleAuthButton;
