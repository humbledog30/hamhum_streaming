import { SidebarFooter } from "./ui/sidebar";
import { NavUser } from "./nav-user";
import { getCurrentUser } from "@/lib/supabase/data-access";

const SidebarFooterUser = async ({}) => {
	const { user, profile } = await getCurrentUser();
	const userDetails = {
		name: user?.user_metadata?.full_name ?? "",
		email: user.email ?? "",
		avatar: profile?.avatar_url ?? user?.user_metadata?.avatar_url,
	};
	return (
		<SidebarFooter>
			<NavUser user={userDetails} />
		</SidebarFooter>
	);
};

export default SidebarFooterUser;
