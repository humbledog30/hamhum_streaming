"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Check, ShieldQuestion } from "lucide-react";
import { toast } from "sonner";

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);

		try {
			// The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/update-password`,
			});
			if (error) throw error;
			setSuccess(true);
			toast.success("Reset link sent!");
		} catch (error: unknown) {
			toast.error(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col w-100 max-w-full mx-auto", className)} {...props}>
			{success ? (
				<div className="flex flex-col gap-10">
					<section className="flex justify-center pt-4">
						<div className="p-3 rounded-full bg-primary flex justify-center items-center relative">
							<div className="absolute size-11 bg-red top-1/2 left-1/2 -translate-1/2 animate-ping z-0 border border-primary rounded-full" />
							<Check
								className="translate-y-0.5 -translate-x-0.5 text-background dark:text-foreground"
								size={40}
							/>
						</div>
					</section>
					<div className=" flex  gap-5 justify-between text-center items-center ">
						<div className=" mb-3">
							<p className="text-pretty">Password reset instructions sent</p>
							<p className="text-xs text-primary text-pretty">
								If you registered using your email and password, you will receive a
								password reset email.
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="w-full">
					<form onSubmit={handleForgotPassword}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Input
									id="email"
									className="w-full"
									type="email"
									placeholder="m@example.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<Button
								type="submit"
								className="w-full primary-btn "
								disabled={isLoading}
							>
								{isLoading ? "Sending..." : "Send reset email"}
							</Button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}
