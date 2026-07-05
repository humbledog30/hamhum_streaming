import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { Bell, Bookmark, Search } from "lucide-react";

export async function AuthButton() {
	const supabase = await createClient();

	// You can also use getUser() which will be slower.
	const { data } = await supabase.auth.getClaims();

	const user = data?.claims;

	return (
		<div className="flex gap-2">
			<Button asChild size="sm" className="rounded-full p-2" variant={"outline"}>
				<Link href="#">
					<Search />
				</Link>
			</Button>
			<Button asChild size="sm" className="rounded-full p-2" variant={"outline"}>
				<Link href="#">
					<Bookmark />
				</Link>
			</Button>
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
				<Button className="rounded-2xl px-5" asChild size="sm" variant={"outline"}>
					<Link href="/auth/sign-in">Sign in</Link>
				</Button>
			)}
		</div>
	);
}
