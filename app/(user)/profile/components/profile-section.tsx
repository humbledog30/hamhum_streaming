import { NextPage } from "next";

interface Props {}

const ProfileSection = ({
	sectionTitle,
	title,
	headerFooter,
	children,
}: {
	sectionTitle?: string;
	title: string;
	headerFooter?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-1">
			{sectionTitle ? (
				<span className="text-primary uppercase text-sm">— {sectionTitle}</span>
			) : null}
			<p className="font-fraunces text-xl font-semibold">{title}</p>
			<p className=" text-sm text-muted-foreground/70">{headerFooter}</p>
			{children}
		</div>
	);
};

export default ProfileSection;
