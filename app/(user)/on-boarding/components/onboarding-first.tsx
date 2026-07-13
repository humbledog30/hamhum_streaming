import { SlashIcon } from "lucide-react";

export const profileAvatars = [
	{ src: "/avatar/P1.png", alt: "Profile Avatar 1" },
	{ src: "/avatar/P2.png", alt: "Profile Avatar 2" },
	{ src: "/avatar/P3.png", alt: "Profile Avatar 3" },
	{ src: "/avatar/P4.png", alt: "Profile Avatar 4" },
	{ src: "/avatar/P5.png", alt: "Profile Avatar 5" },
	{ src: "/avatar/P6.png", alt: "Profile Avatar 6" },
];

interface OnboardingFirstProps {
	isActive: boolean;
	avatarSrc: string;
	setAvatarSrc: (src: string) => void;
	profileName: string | undefined;
	setProfileName: (name: string) => void;
	activeIndex: number;
	setActiveIndex: (index: number) => void;
}

const OnboardingFirst = ({
	isActive,
	avatarSrc,
	setAvatarSrc,
	profileName,
	setProfileName,
	activeIndex,
	setActiveIndex,
}: OnboardingFirstProps) => {
	return (
		<div
			data-step={isActive ? "active" : "inactive"}
			className="profile-step-1 hidden data-[step=active]:flex flex-col items-center gap-4 py-6"
		>
			<div className=" flex gap-3 uppercase items-center text-xs mb-2 text-primary/80 tracking-widest">
				<SlashIcon size={14} className="rotate-45" />
				<span>Step 1 of 3</span>
				<SlashIcon size={14} className="rotate-45" />
			</div>
			<h3 className="text-5xl font-fraunces font-semibold">
				Who's watching{" "}
				<span className="italic font-normal text-muted-foreground">tonight?</span>
			</h3>
			<p className="text-muted-foreground max-w-95">Pick a profile that feels like you.</p>
			<div className="mt-5 flex flex-col items-center gap-5">
				<div className="size-33 border border-primary rounded-full dark:bg-foreground/30 bg-muted-foreground/20">
					<img className="w-full h-full" src={avatarSrc} alt="User Profile" />
				</div>
				<div className="flex flex-wrap gap-3 justify-center">
					{profileAvatars.map((item, index) => (
						<div
							key={`profile-avatar-${index}`}
							data-state={index === activeIndex ? "active" : "inactive"}
							className="profile-select size-12 border border-primary rounded-full dark:bg-foreground/30  transition-all duration-300 bg-muted-foreground/20 data-[state=active]:scale-105 hover:dark:bg-primary hover:bg-primary data-[state=active]:dark:bg-primary data-[state=active]:bg-primary"
						>
							<img
								onClick={() => {
									setAvatarSrc(item.src);
									setActiveIndex(index);
								}}
								className="w-full h-full cursor-pointer"
								src={item.src}
								alt={item.alt}
							/>
						</div>
					))}
				</div>
			</div>
			<input
				value={profileName}
				onChange={(e) => setProfileName(e.target.value)}
				className="mt-3 text-center text-xl font-inter focus-within:border-b focus:border-b border-b border-primary/40 outline-0 p-3"
				type="text"
				placeholder="Your name"
			/>
		</div>
	);
};

export default OnboardingFirst;
