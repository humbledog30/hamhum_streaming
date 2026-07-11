import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { Bell } from "lucide-react";
import UserProfile from "./user-profile";

export async function AuthButton() {
	const supabase = await createClient();
	// You can also use getUser() which will be slower.
	const { data } = await supabase.auth.getClaims();

	const user = data?.claims;

	return (
		<>
			{user ? (
				<UserProfile user={user} />
			) : (
				<Button
					className=" px-6 lg:px-10 primary-btn"
					asChild
					size="sm"
					variant={"default"}
				>
					<Link href="/auth/login">Sign in</Link>
				</Button>
			)}
		</>
	);
}
