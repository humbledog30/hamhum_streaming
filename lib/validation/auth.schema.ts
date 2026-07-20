import { z } from "zod";

export const loginSchema = z.object({
	email: z.email("Email is required"),
	password: z
		.string("Password is required")
		.min(8, "Password must be at least 8 characters long")
		.regex(/[a-zA-Z]/, "Password must contain at least one letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export type LoginResult =
	| { success: true }
	| {
			success: false;
			fieldErrors?: Partial<Record<keyof LoginForm, string[]>>;
			formError?: string;
	  };

export const signupSchema = z
	.object({
		email: z.email("Email is required"),
		password: z
			.string("Password is required")
			.min(8, "Password must be at least 8 characters long")
			.regex(/[a-zA-Z]/, "Password must contain at least one letter")
			.regex(/[0-9]/, "Password must contain at least one number"),
		confirmPassword: z
			.string("Password is required")
			.min(8, "Password must be at least 8 characters long")
			.regex(/[a-zA-Z]/, "Password must contain at least one letter")
			.regex(/[0-9]/, "Password must contain at least one number"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpForm = z.infer<typeof signupSchema>;

export type SignUpResult =
	| { success: true }
	| {
			success: false;
			fieldErrors?: Partial<Record<keyof SignUpForm, string[]>>;
			formError?: string;
	  };
