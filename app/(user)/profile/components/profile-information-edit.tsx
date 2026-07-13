import { Button } from "@/components/ui/button";

import UserAvatar from "@/components/user-avatar";
import { requireUserClaims } from "@/lib/supabase/data-access";
import ProfileInformationForm from "./profile-information-form";

const ProfileInformationEdit = async ({}) => {
	const claims = await requireUserClaims();
	const fullName = claims?.user_metadata?.full_name;
	const email = claims?.email;
	return (
		<div className="flex flex-col gap-5 mt-5">
			<div className="flex gap-4 items-end">
				<UserAvatar user={claims} size="size-20" />
				<div className="flex flex-col gap-2 items-start">
					<Button className="cursor-pointer" variant={"outline"}>
						Upload photo
					</Button>
					<p className="text-[10px] text-muted-foreground/70">
						Supported formats: <span className="font-semibold">JPG, PNG</span>
						<br />
						Maximum file size: <span className="font-semibold">2 MB</span>
					</p>
				</div>
			</div>
			<ProfileInformationForm initialFullName={fullName} initialEmail={email} />
		</div>
	);
};

export default ProfileInformationEdit;
