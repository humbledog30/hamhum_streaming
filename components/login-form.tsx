"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import GoogleAuthButton from "./auth-button-google";
import FigmaAuthButton from "./auth-button-figma";
import AuthButtonDiscord from "./auth-button-discord";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;

			const redirectTo = searchParams.get("redirect");
			const safeRedirect =
				redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
					? redirectTo
					: "/";

			router.push(safeRedirect);
			router.refresh();
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
					Welcome back
				</span>
				<div className="flex w-full text-3xl font-fraunces font-semibold group">
					<h1 className="w-full flex gap-1 flex-wrap">
						Log in to
						<span className="flex text-foreground transition-all duration-300">
							Ham
							<span className="text-primary font-extrabold text-2xl -mt-2 -ml-1 block w-fit transition-all duration-300">
								+
							</span>
							Hum
						</span>
					</h1>
				</div>
				<div className="mt-2 text-sm flex gap-1">
					New here?
					<Link href="/auth/sign-up" className="text-primary font-bold">
						Create an account
					</Link>
				</div>
			</div>
			<form onSubmit={handleLogin}>
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
							<Link
								href="/auth/forgot-password"
								className="ml-auto inline-block text-sm underline-offset-4 hover:text-primary"
							>
								Forgot your password?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && <p className="text-sm text-red-500">{error}</p>}
					<Button
						type="submit"
						className="w-full py-5 bg-linear-to-br from-primary to-primary hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-300"
						disabled={isLoading}
					>
						{isLoading ? "Logging in..." : "Log in"}
					</Button>
				</div>
			</form>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<GoogleAuthButton />
				<FigmaAuthButton />
				<AuthButtonDiscord />
			</div>
		</div>
	);
}
