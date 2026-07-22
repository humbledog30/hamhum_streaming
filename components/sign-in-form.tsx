"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import GoogleAuthButton from "./auth-button-google";
import FigmaAuthButton from "./auth-button-figma";
import AuthButtonDiscord from "./auth-button-discord";

import { useLogin } from "@/lib/hooks/auth/use-login";
import InputField from "./input-field";

export function SignForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { mutate, data, isPending } = useLogin();

	const fieldErrors = data?.success === false ? data.fieldErrors : undefined;
	const formError = data?.success === false ? data.formError : undefined;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate({ email, password });
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
						Sign in to
						<span className="flex text-foreground transition-all duration-200">
							Ham
							<span className="text-primary font-extrabold text-2xl -mt-2 -ml-1 block w-fit transition-all duration-200">
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
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-6">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<InputField
							id="email"
							type="email"
							placeholder="m@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{fieldErrors?.email && (
							<p className="text-sm text-red-500">{fieldErrors.email[0]}</p>
						)}
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

						<InputField
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						{fieldErrors?.password && (
							<p className="text-sm text-red-500">{fieldErrors.password[0]}</p>
						)}
					</div>
					{formError && <p className="text-sm text-red-500">{formError}</p>}
					<Button
						type="submit"
						className="w-full py-5 bg-linear-to-br from-primary to-primary hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-200"
						disabled={isPending}
					>
						{isPending ? "Signing in..." : "Sign in"}
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
				{/* <FigmaAuthButton /> */}
				<AuthButtonDiscord />
			</div>
		</div>
	);
}
