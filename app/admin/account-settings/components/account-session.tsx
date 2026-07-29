import { ExpandableWrapper } from "@/components/ExpandableSection";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { formatRelativeTime } from "@/lib/utils/format-time";
import React from "react";
import { FaDesktop, FaMobileScreen } from "react-icons/fa6";

interface SessionProps {
	id: string;
	user_id: string;
	device_id: string;
	device_label: string;
	user_agent: string;
	ip_address: string;
	is_current: boolean;
	last_active_at: string;
	created_at: string;
}

const AccountSession = async ({}) => {
	const supabase = await createClient();

	const { data: sessionData } = await supabase
		.from("user_devices")
		.select("*")
		.order("last_active_at", { ascending: false });
	return (
		<div className="flex flex-col gap-3">
			{sessionData?.map((session: SessionProps, sessionIndex) => {
				const lastActive = formatRelativeTime(session.last_active_at);
				const isDesktop = session?.user_agent.includes("Windows");
				return (
					<React.Fragment key={session.id}>
						<div className="grid grid-cols-[auto_1fr] gap-2 w-full items-center">
							<div className="bg-accent p-2 rounded-md self-baseline mt-1">
								{isDesktop ? <FaDesktop /> : <FaMobileScreen />}
							</div>
							<div className="pr-5 text-pretty">
								<p className="font-semibold -mb-0.5">{session.device_label}</p>
								<p className="text-muted-foreground text-xs">
									{session.user_agent}
								</p>

								<p
									className={`mt-2 text-xs ${session?.is_current === true ? "text-green-400" : "text-muted-foreground/40"}`}
								>
									{session?.is_current
										? "Active now"
										: `Active last ${lastActive}`}
								</p>
							</div>
						</div>
						{sessionData?.length > sessionIndex + 1 ? <Separator /> : null}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default AccountSession;
