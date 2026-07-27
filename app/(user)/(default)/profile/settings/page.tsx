import BasicHeader from "@/components/basic-header";
import { NextPage } from "next";
import ProfileSection from "../components/profile-section";
import ProfileInformationEdit from "../components/profile-information-edit";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import ProfilePasswordForm from "../components/profile-password-form";
import ProfileDeleteForm from "../components/profile-delete-form";
import ProfileGenreEdit from "../components/profile-genre-edit";
import ProfileGenreSkeleton from "../components/SkeletonLoader/profile-genre-skeleton";

const AccountSettingsPage = () => {
	return (
		<div className="w-full max-w-180 flex flex-col gap-15 px-5 mx-auto py-10 mt-10 text-foreground relative">
			<BasicHeader
				sticker="Your Account"
				title="Account Settings"
				description="Manage your profile, plan, and how Ham+Hum works for you."
			/>
			<div className="flex flex-col gap-10">
				<ProfileSection
					sectionTitle="Profile"
					title="Personal information"
					headerFooter="This is how you appear across your account."
				>
					<Suspense>
						<ProfileInformationEdit />
					</Suspense>
				</ProfileSection>
				<Separator />
				<ProfileSection
					sectionTitle="Security"
					title="Password"
					headerFooter="Use at least 8 characters, mixing letters and numbers."
				>
					<div className="mt-5">
						<ProfilePasswordForm />
					</div>
				</ProfileSection>
				<Separator />
				<ProfileSection
					sectionTitle="Preferences"
					title="Favorite genres"
					headerFooter="Pick genres you love — this shapes your recommendations and shows on your profile."
				>
					<Suspense fallback={<ProfileGenreSkeleton />}>
						<ProfileGenreEdit />
					</Suspense>
				</ProfileSection>
				<Separator />
				<ProfileSection sectionTitle="Account" title="Danger zone">
					<div className="mt-5">
						<ProfileDeleteForm />
					</div>
				</ProfileSection>
			</div>
		</div>
	);
};

export default AccountSettingsPage;
