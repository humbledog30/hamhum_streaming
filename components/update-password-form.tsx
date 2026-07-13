"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { appToast } from "./app-toast";

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);

		try {
			if (password !== confirmPassword) {
				appToast.error("Passwords do not match.");
				return false;
			}
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			// Update this route to redirect to an authenticated route. The user already has an active session.
			appToast.success("Your password has been updated.");
			router.push("/"); //Protected
		} catch (error: unknown) {
			appToast.success(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6 w-100 max-w-full mx-auto", className)} {...props}>
			<form onSubmit={handleForgotPassword}>
				<div className="flex flex-col gap-6">
					<div className="grid gap-2">
						<Input
							id="password"
							type="password"
							placeholder="New password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Input
							id="c-password"
							type="password"
							placeholder="Confirm password"
							required
							value={confirmPassword}
							onChange={(e) => setconfirmPassword(e.target.value)}
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Saving..." : "Save new password"}
					</Button>
				</div>
			</form>
		</div>
	);
}
