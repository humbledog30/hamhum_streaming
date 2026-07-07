"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleAuthButton from "./google-auth-button";

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		if (password !== repeatPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/on-boarding`,
				},
			});

			if (error) throw error;

			// Supabase returns a "fake" success when the email already exists
			// data.user.identities will be an empty array in that case
			if (data.user && data.user.identities && data.user.identities.length === 0) {
				setError("An account with this email already exists. Please sign in instead.");
				setIsLoading(false);
				return;
			}

			router.push("/on-boarding");
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={cn(
				"flex flex-col gap-7 h-full justify-center p-12 pb-20 border-t-2 border-l-0 md:border-l-2 md:border-t-0",
				className,
			)}
			{...props}
		>
			<div className="w-full flex flex-col ">
				<span className="uppercase font-jetbrains-mono text-xs tracking-wider mb-2 text-muted-foreground">
					Get started
				</span>
				<div className="flex w-full text-3xl font-fraunces font-semibold group">
					<h1 className="w-full flex gap-1">Create your account</h1>
				</div>
				<div className="mt-2 text-sm flex gap-1">
					Already have one?
					<Link href="/auth/login" className="text-primary font-bold">
						Log in
					</Link>
				</div>
			</div>
			<form onSubmit={handleSignUp}>
				<div className="flex flex-col gap-6">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
						</div>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="repeat-password">Repeat Password</Label>
						</div>
						<Input
							id="repeat-password"
							type="password"
							required
							value={repeatPassword}
							onChange={(e) => setRepeatPassword(e.target.value)}
						/>
					</div>
					{error && <p className="text-sm text-red-500">{error}</p>}
					<Button
						type="submit"
						className="w-full rounded-3xl py-5 bg-linear-to-br from-primary to-primary hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-300"
						disabled={isLoading}
					>
						{isLoading ? "Creating an account..." : "Sign up"}
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						or sign up with
					</span>
				</div>
			</div>
			<GoogleAuthButton setError={setError} />
		</div>
	);
}
