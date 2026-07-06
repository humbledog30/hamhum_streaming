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

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const router = useRouter();

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
			// Update this route to redirect to an authenticated route. The user already has an active session.
			router.push("/protected");
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		const supabase = createClient();
		setIsGoogleLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
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
					<Link href="/">
						<h1 className="w-full flex gap-1">
							Log in to
							<span className="flex text-foreground group-hover:text-primary transition-all duration-300">
								Ham
								<span className="text-primary group-hover:text-foreground font-extrabold text-2xl -mt-2 -ml-1 block w-fit transition-all duration-300">
									+
								</span>
								hum
							</span>
						</h1>
					</Link>
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
						className="w-full rounded-3xl py-5 bg-linear-to-br from-primary to-primary hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-300"
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
						Or continue with email
					</span>
				</div>
			</div>
			<Button
				type="button"
				variant="outline"
				className="w-full rounded-3xl py-5 flex items-center gap-2 hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-300"
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
		</div>
	);
}
