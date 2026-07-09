"use client";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { JwtPayload } from "@supabase/supabase-js";

const UserAvatar = ({ user, size }: { user: JwtPayload; size?: string }) => {
	const userAvatar = user?.user_metadata?.avatar_url ?? "";
	const userPicture = user?.user_metadata?.picture ?? "";
	const fullName = user?.user_metadata?.full_name ?? "";
	const email = user?.user_metadata?.email ?? "";

	const nameInitials = fullName
		? fullName
				.split(" ")
				.map((word: string) => word[0])
				.slice(0, 2)
				.join("")
		: (email?.charAt(0).toUpperCase() ?? "?");

	return (
		<Avatar className={size}>
			<AvatarImage src={userAvatar || userPicture} />
			<AvatarFallback className=" uppercase">{nameInitials}</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
