import UserAvatar from "@/components/user-avatar";
import { requireUser, requireUserClaims } from "@/lib/supabase/data-access";

const ProfileContent = async () => {
	const claims = await requireUserClaims();
	const user = await requireUser();
	return (
		<div className="flex items-center text-center flex-col gap-6">
			<UserAvatar user={claims} size="size-24" />
			<div>
				<p className="relative z-10 font-fraunces text-2xl md:text-3xl font-medium mb-3 capitalize">
					{claims?.user_metadata?.name ?? claims.email?.split("@")[0]}
				</p>
				<p className="relative z-10 text-muted-foreground mx-auto w-full max-w-130 text-pretty mb-3">
					{claims.email}
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
