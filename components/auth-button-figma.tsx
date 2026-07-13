import { NextPage } from "next";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { appToast } from "./app-toast";

const FigmaAuthButton = ({}) => {
	const [isFigmaLoading, setIsFigmaLoading] = useState(false);
	const searchParams = useSearchParams();
	const handleFigmaSignin = async () => {
		try {
			const supabase = createClient();
			appToast.info("Available Soon!", { description: "Pending review by Figma" });
			// setIsFigmaLoading(true);

			// const redirectTo = searchParams.get("redirect");
			// const safeRedirect =
			// 	redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
			// 		? redirectTo
			// 		: "/";

			// const { data, error } = await supabase.auth.signInWithOAuth({
			// 	provider: "figma",
			// 	options: {
			// 		redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(safeRedirect)}`,
			// 		queryParams: {
			// 			scope: "current_user:read",
			// 		},
			// 	},
			// });
			// if (error) throw error;
		} catch (error) {
			appToast.error(error instanceof Error ? error.message : "An error occurred");
			setIsFigmaLoading(false);
		}
	};
	return (
		<Button
			type="button"
			variant="outline"
			className="w-full py-5 flex items-center gap-2 hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-300"
			onClick={handleFigmaSignin}
			disabled={isFigmaLoading}
		>
			<Icon icon="logos:figma" />
			{isFigmaLoading ? "Redirecting..." : "Continue with Figma"}
		</Button>
	);
};

export default FigmaAuthButton;
