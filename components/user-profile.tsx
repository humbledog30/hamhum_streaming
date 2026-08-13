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
import { logout } from "@/lib/hooks/useAuthLogout";
import { ProfilePayload } from "@/types/Profile";

const UserProfile = ({ user }: { user: ProfilePayload }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const handleLogout = async () => {
		setIsLoading(true);
		try {
			await logout();
			router.push("/auth/sign-in");
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
						className="group-data-[state=open]:rotate-180 transition-all duration-200"
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-80 max-w-full mt-3 border border-primary rounded-xl px-0"
			>
				<DropdownMenuItem
					className="flex-1 py-3 cursor-pointer"
					onSelect={(e) => router.push("/profile")}
				>
					<div className="flex gap-4 items-center">
						<UserAvatar size="size-15" user={user} />
						<div>
							<p className="text-lg font-fraunces font-semibold -mb-1 capitalize">
								{user?.display_name}
							</p>
							<p className="text-xs text-muted-foreground">View Profile</p>
						</div>
					</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="flex-1 cursor-pointer"
					onSelect={() => router.push("/profile/settings")}
				>
					<SettingsIcon />
					Profile Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex-1" disabled>
					<Bell />
					Notification
				</DropdownMenuItem>
				<DropdownMenuItem className="flex-1" disabled>
					<PlayCircle />
					Continue Watching
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-1  cursor-pointer"
					onSelect={() => router.push("/bookmark")}
				>
					<Bookmark />
					Bookmark
				</DropdownMenuItem>

				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<ThemeSwitcherMenu />
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex-1 cursor-pointer"
						onSelect={() => router.push("/help-center")}
					>
						<HelpCircle />
						Help Center
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer "
					onClick={handleLogout}
					disabled={isLoading}
					variant={"destructive"}
				>
					<LogOutIcon className="" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfile;
