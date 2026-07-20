"use client";

import { ProfilePayload } from "@/types/Profile";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { JwtPayload } from "@supabase/supabase-js";

const UserAvatar = ({ user, size }: { user: ProfilePayload; size?: string }) => {
	if (!user) return null;
	const userAvatar = user?.avatar_url ?? "";
	const fullName = user?.display_name ?? "";

	const nameInitials = fullName
		.split(" ")
		.map((word: string) => word[0])
		.slice(0, 2)
		.join("");

	return (
		<Avatar className={size}>
			<AvatarImage src={userAvatar} />
			<AvatarFallback className=" uppercase">{nameInitials}</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
