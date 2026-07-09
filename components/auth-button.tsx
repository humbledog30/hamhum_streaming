import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { Bell, Bookmark, Search } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

export async function AuthButton() {
	const supabase = await createClient();

	// You can also use getUser() which will be slower.
	const { data } = await supabase.auth.getClaims();

	const user = data?.claims;

	return (
		<>
			{user ? (
				<Button asChild size="sm" className="rounded-full p-2" variant={"outline"}>
					<Link href="#">
						<Bell />
					</Link>
				</Button>
			) : null}
			{user ? (
				<LogoutButton />
			) : (
				<Button className="rounded-2xl px-10" asChild size="sm" variant={"outline"}>
					<Link href="/auth/login">Sign in</Link>
				</Button>
			)}
			<ThemeSwitcher />
		</>
	);
}
