"use client";
import BasicHeader from "@/components/basic-header";
import { Button } from "@/components/ui/button";
import { useResendTimer } from "@/lib/hooks/useResendTimer";
import { Send, SendIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { appToast } from "@/components/app-toast";

export default function Page() {
	const [email, setEmail] = useState<string | null>(null);
	const { secondsLeft, isCanResend, startTimer } = useResendTimer();

	useEffect(() => {
		const storedEmail = sessionStorage.getItem("signup-email");

		if (storedEmail) {
			startTimer();
			setEmail(storedEmail);
		}
	}, []);
	const handleResend = async () => {
		const supabase = createClient();
		startTimer();
		if (!email) {
			appToast.error("Email is not present!");
			return false;
		}
		const { error } = await supabase.auth.resend({
			type: "signup",
			email: email,
		});
		if (error) {
			appToast.error(error?.message);
			return false;
		}
		appToast.success(
			"Confirmation email resent! Please check your inbox for the verification link.",
		);
		appToast.info(
			"If you didn't receive the email, it may be because Supabase limits confirmation emails to 2 per hour.",
		);
		sessionStorage.removeItem("signup-email");
	};
	return (
		<div className="max-w-180 w-full mx-auto px-5 flex flex-col gap-10 py-10 mt-10 text-foreground">
			<BasicHeader
				sticker="One More Step"
				title="Check your inbox"
				description={`We've sent a confirmation link to ${email}. Click it to activate your account and start building your watchlist.`}
				footer="Sent just now"
			/>

			<section className="flex justify-center pt-4">
				<div className="p-3 rounded-full bg-primary flex justify-center items-center relative">
					<div className="absolute size-11 bg-red top-1/2 left-1/2 -translate-1/2 animate-ping z-0 border border-primary rounded-full" />
					<Send
						className="translate-y-0.5 -translate-x-0.5 text-background dark:text-foreground"
						size={40}
					/>
				</div>
			</section>

			<section className="w-120 max-w-full mx-auto">
				<div className=" flex border gap-5 justify-between bg-border/40 p-6  rounded-xl items-center ">
					<div>
						<p className="text-pretty">Didn't get it?</p>
						<p className="text-xs text-primary">Check spam, or send a new one</p>
					</div>

					<Button
						className="text-muted-foreground cursor-pointer"
						variant={"outline"}
						onClick={handleResend}
						disabled={!isCanResend}
					>
						{!isCanResend ? `Resend in ${secondsLeft}s` : "Resend Code"}
					</Button>
				</div>
				<p className="text-muted-foreground text-xs text-center mt-3">
					Wrong email?{" "}
					<Link
						className="hover:text-primary hover:underline"
						href="/auth/sign-up"
						onClick={() => sessionStorage.removeItem("signup-email")}
					>
						Go back and edit
					</Link>
				</p>
			</section>
		</div>
	);
}
