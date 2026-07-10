"use client";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { JwtPayload } from "@supabase/supabase-js";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Bell,
	Bookmark,
	ChevronDown,
	HelpCircle,
	LogOutIcon,
	PlayCircle,
	SettingsIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import UserAvatar from "./user-avatar";

import { ThemeSwitcherMenu } from "./theme-swtcher-menu";
import Link from "next/link";

const UserProfile = ({ user }: { user: JwtPayload }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const logout = async () => {
		setIsLoading(true);
		try {
			const supabase = createClient();
			const { error } = await supabase.auth.signOut();

			if (error) throw error;

			router.push("/auth/login");
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<div className="flex items-center gap-1 cursor-pointer group">
					<UserAvatar user={user} />
					<ChevronDown
						size={12}
						className="group-data-[state=open]:rotate-180 transition-all duration-300"
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-80 max-w-full mt-3 border border-primary rounded-xl px-0"
			>
				<DropdownMenuItem className="flex-1 py-3" onSelect={(e) => e.preventDefault()}>
					<div className="flex gap-4 items-center">
						<UserAvatar size="size-15" user={user} />
						<div>
							<p className="text-lg font-fraunces font-semibold -mb-1">
								{user?.user_metadata?.full_name}
							</p>
							<Link className="text-xs text-muted-foreground" href={"/profile"}>
								View Profile
							</Link>
						</div>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex-1">
					<SettingsIcon />
					Account Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex-1">
					<Bell />
					Notification
				</DropdownMenuItem>
				<DropdownMenuItem className="flex-1">
					<PlayCircle />
					Continue Watching
				</DropdownMenuItem>
				<DropdownMenuItem className="flex-1">
					<Bookmark />
					Bookmark
				</DropdownMenuItem>

				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<ThemeSwitcherMenu />
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="flex-1">
						<HelpCircle />
						Help Center
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer " onClick={logout} disabled={isLoading}>
					<LogOutIcon className="" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfile;
