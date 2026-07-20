import { requireUser } from "@/lib/supabase/data-access";
import { NextPage } from "next";

interface Props {}

const WelcomeAdmin = async ({}) => {
	const user = await requireUser();
	return (
		<div className="text-2xl md:text-3xl lg:text-4xl font-fraunces font-semibold">
			<p className="mb-3">Welcome back,</p>
			<p className="italic text-primary text-xl md:text-2xl lg:text-3xl">{user.email}</p>
		</div>
	);
};

export default WelcomeAdmin;
