import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { JwtPayload, User } from "@supabase/supabase-js";

export const getUserClaims = cache(async () => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getClaims();

	if (error || !data?.claims) {
		return null;
	}

	return data.claims;
});

export const requireUserClaims = cache(async (): Promise<JwtPayload> => {
	const claims = await getUserClaims();
	if (!claims) {
		redirect("/auth/login");
	}
	return claims;
});

export const getUser = cache(async () => {
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return null;
	}

	return user;
});

export const requireUser = cache(async (): Promise<User> => {
	const user = await getUser();
	if (!user) {
		redirect("/auth/login");
	}
	return user;
});
