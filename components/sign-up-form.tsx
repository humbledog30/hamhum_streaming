"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import GoogleAuthButton from "./auth-button-google";
import { useSignup } from "@/lib/hooks/auth/use-signup";

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { mutate, isPending, data } = useSignup();

	const handleSignUp = (e: React.FormEvent) => {
		e.preventDefault();
		mutate({ email, password, confirmPassword });
	};

	const fieldErrors = data?.success === false ? data.fieldErrors : undefined;
	const formError = data?.success === false ? data.formError : undefined;

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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{fieldErrors?.email && (
							<p className="text-sm text-red-500">{fieldErrors.email[0]}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{fieldErrors?.password && (
							<p className="text-sm text-red-500">{fieldErrors.password[0]}</p>
						)}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="repeat-password">Repeat Password</Label>
						<Input
							id="repeat-password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{fieldErrors?.confirmPassword && (
							<p className="text-sm text-red-500">{fieldErrors.confirmPassword[0]}</p>
						)}
					</div>
					{formError && <p className="text-sm text-red-500">{formError}</p>}
					<Button
						type="submit"
						className="w-full py-5 bg-linear-to-br from-primary to-primary hover:-translate-y-0.5 hover:cursor-pointer transition-all duration-300"
						disabled={isPending}
					>
						{isPending ? "Creating an account..." : "Sign up"}
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
			<GoogleAuthButton />
		</div>
	);
}
