import { Suspense } from "react";
import CardSection from "../components/card-section";

import AccountInformationEdit from "./components/account-information-edit";
import AccountInformationSkeleton from "./components/skeleton-loader/account-information-skeleton";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import AccountPasswordForm from "./components/account-password-form";
import { FaDesktop, FaMobileScreen } from "react-icons/fa6";
import { ThemeSwitcherMenu } from "@/components/theme-swtcher-menu";
import AccountDeactiveForm from "./components/account-deactivate-form";
import AccountSession from "./components/account-session";
import AccountSessionSkeleton from "./components/skeleton-loader/account-session-skeleton";

export const metadata: Metadata = {
	metadataBase: new URL("http://localhost:3000/admin/account-settings"),
	title: "Ham+Hum | Account Settings",
};

const Page = ({}) => {
	return (
		<div className="w-full p-5 text-foreground relative">
			<div className="col-span-2">
				<h1 className="relative z-10 font-fraunces text-2xl md:text-3xl font-medium mb-1">
					Account Settings
				</h1>
				<p className="relative z-10 text-muted-foreground w-full text-pretty mb-3">
					Manage your profile, security, and preferences for the admin dashboard.
				</p>
			</div>
			<div className="flex flex-col gap-5">
				<CardSection
					title="Profile Info"
					description="Your identity across the admin dashboard."
				>
					<Suspense fallback={<AccountInformationSkeleton />}>
						<AccountInformationEdit />
					</Suspense>
				</CardSection>
				<CardSection
					title="Security"
					description="Password, two-factor authentication, and session management."
				>
					<div className="flex flex-col gap-5">
						<AccountPasswordForm />
						<Separator />
						<div className="grid grid-cols-[1fr_auto] gap-3 opacity-30">
							<p className="font-semibold">Two-factor authentication</p>
							<span className="text-xs font-medium text-green-500">Coming soon</span>
							<div>
								<p className="-mb-1 text-sm">Require a code at sign-in</p>
								<span className="text-xs text-muted-foreground">
									Adds an extra verification step beyond your password
								</span>
							</div>
							<div className="self-center ml-auto">
								<Switch className="cursor-not-allowed" disabled={true} />
							</div>
						</div>
						<Separator />
						<div className="flex flex-col gap-4">
							<p className="font-semibold">Active sessions</p>

							<Suspense fallback={<AccountSessionSkeleton />}>
								<AccountSession />
							</Suspense>
						</div>
					</div>
				</CardSection>
				<CardSection
					title="Preferences"
					description="How the dashboard looks and behaves for you specifically."
				>
					<ThemeSwitcherMenu type="normal" />
				</CardSection>
				<CardSection title="Danger Zone" type="dangerous">
					<AccountDeactiveForm />
				</CardSection>
			</div>
		</div>
	);
};

export default Page;
