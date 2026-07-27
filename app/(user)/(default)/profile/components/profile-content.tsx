import UserAvatar from "@/components/user-avatar";
import { getCurrentUser } from "@/lib/supabase/data-access";

const ProfileContent = async () => {
	const { user, profile: profileData } = await getCurrentUser();
	return (
		<div className="flex items-center text-center flex-col gap-6">
			<UserAvatar user={profileData} size="size-24" />
			<div>
				<p className="relative z-10 font-fraunces text-2xl md:text-3xl font-medium mb-3 capitalize">
					{profileData?.display_name ?? user.email?.split("@")[0]}
				</p>
				<p className="relative z-10 text-muted-foreground mx-auto w-full max-w-130 text-pretty mb-3">
					{user.email}
				</p>
				<p className="text-muted-foreground/60 text-xs">
					Member since{" "}
					{new Date(user.created_at).toLocaleDateString("en-US", {
						month: "long",
						year: "numeric",
					})}
				</p>
			</div>
		</div>
	);
};

export default ProfileContent;
