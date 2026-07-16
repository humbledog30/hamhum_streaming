import { SidebarFooter } from "./ui/sidebar";
import { NavUser } from "./nav-user";
import { requireUser } from "@/lib/supabase/data-access";

interface Props {}

const SidebarFooterUser = async ({}) => {
	const user = await requireUser();
	const userDetails = {
		name: user?.user_metadata?.full_name ?? "",
		email: user.email ?? "",
		avatar: user?.user_metadata?.avatar_url ?? "",
	};
	return (
		<SidebarFooter>
			<NavUser user={userDetails} />
		</SidebarFooter>
	);
};

export default SidebarFooterUser;
