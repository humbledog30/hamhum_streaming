import { requireUser } from "@/lib/supabase/data-access";
import { Icon } from "@iconify/react";
import { Dot } from "lucide-react";

export const PROVIDER_ICONS: Record<string, string> = {
	google: "logos:google-icon",
	github: "logos:github-icon",
	gitlab: "logos:gitlab",
	bitbucket: "logos:bitbucket",
	azure: "logos:microsoft-azure",
	facebook: "logos:facebook",
	twitter: "logos:twitter",
	discord: "logos:discord-icon",
	twitch: "logos:twitch",
	spotify: "logos:spotify-icon",
	slack: "logos:slack-icon",
	linkedin: "logos:linkedin-icon",
	notion: "logos:notion-icon",
	workos: "logos:workos-icon",
	apple: "logos:apple",
	kakao: "logos:kakao",
	keycloak: "logos:keycloak",
	figma: "logos:figma",
	zoom: "logos:zoom-icon",
	fly: "logos:fly",
	linkedin_oidc: "logos:linkedin-icon",
};
export const DEFAULT_PROVIDER_ICON = "mdi:email-outline";

export function getProviderIcon(provider: string): string {
	return PROVIDER_ICONS[provider] ?? DEFAULT_PROVIDER_ICON;
}

const ProfileAccountConnected = async () => {
	const user = await requireUser();
	const identities = user?.identities;
	return (
		<div className="flex flex-col gap-1">
			<span className="text-primary uppercase text-sm">— Account</span>
			<p className="font-fraunces text-xl font-semibold">Connected accounts</p>
			<ul className="flex flex-col gap-4 mt-4">
				{identities?.map((item, index) => {
					return (
						<li
							key={`provider-${item.provider}`}
							className="capitalize flex gap-3 items-center not-last:pb-4 not-last:border-b border-muted-foreground/10 text-sm tracking-wide text-muted-foreground"
						>
							<div className="bg-primary/30 p-2 rounded-md">
								<Icon
									icon={getProviderIcon(item.provider)}
									className="size-5 text-foreground"
								/>
							</div>
							{item.provider}
							<span className="ml-auto text-green-400 flex items-center gap-2">
								<span className="scale-150">•</span> Connected
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ProfileAccountConnected;
