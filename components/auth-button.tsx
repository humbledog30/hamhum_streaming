import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { Bell } from "lucide-react";
import UserProfile from "./user-profile";
import { requireUserClaims } from "@/lib/supabase/data-access";

export async function AuthButton() {
	const supabase = await createClient();
	const { data, error } = await supabase.from("profiles").select().single();
	const user = data;
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
					<Link href="/auth/sign-in">Sign in</Link>
				</Button>
			)}
		</>
	);
}
