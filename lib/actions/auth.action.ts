"use server";

import {
	loginSchema,
	SignUpForm,
	SignUpResult,
	signupSchema,
	type LoginForm,
	type LoginResult,
} from "@/lib/validation/auth.schema";
import { createClient } from "../supabase/server";
import z from "zod";

export async function login(input: LoginForm): Promise<LoginResult> {
	const result = loginSchema.safeParse(input);
	if (!result.success) {
		const { fieldErrors, formErrors } = z.flattenError(result.error);
		return {
			success: false,
			fieldErrors,
			formError: formErrors[0],
		} satisfies LoginResult;
	}

	const supabase = await createClient();
	const { error } = await supabase.auth.signInWithPassword(result.data);

	if (error) {
		return { success: false, formError: error.message };
	}

	return { success: true };
}

export async function signup(input: SignUpForm): Promise<SignUpResult> {
	const result = signupSchema.safeParse(input);
	if (!result.success) {
		const { fieldErrors, formErrors } = z.flattenError(result.error);
		return {
			success: false,
			fieldErrors,
			formError: formErrors[0],
		} satisfies SignUpResult;
	}

	const { email, password } = result.data;

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/on-boarding`,
		},
	});

	if (error) {
		return { success: false, formError: error.message };
	}

	if (data.user && data.user.identities && data.user.identities.length === 0) {
		return {
			success: false,
			formError: "An account with this email already exists. Please sign in instead.",
		};
	}

	return { success: true };
}
