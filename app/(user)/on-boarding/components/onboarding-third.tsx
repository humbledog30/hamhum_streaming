"use client";
import { Button } from "@/components/ui/button";
import { useGenresLabel } from "@/lib/hooks/useGenresLabel";
import { ChevronRight, Dot, SlashIcon } from "lucide-react";
import React, { useState } from "react";
import { saveOnboardingProfile } from "../action";
import { appToast } from "@/components/app-toast";
import { useRouter } from "next/navigation";

interface OnboardinThirdProps {
	isActive: boolean;
	avatarSrc: string;
	profileName: string | undefined;
	selectedGenres: number[];
}

const OnboardingThird = ({
	isActive,
	avatarSrc,
	profileName,
	selectedGenres,
}: OnboardinThirdProps) => {
	const [isSaving, setIsSaving] = useState(false);
	const router = useRouter();
	return (
		<div
			data-step={isActive ? "active" : "inactive"}
			className="profile-step-3 hidden data-[step=active]:flex flex-col items-center gap-4 py-6"
		>
			<div className="size-33 border border-primary rounded-full dark:bg-foreground/30 bg-muted-foreground/20">
				<img className="w-full h-full" src={avatarSrc} alt="User Profile" />
			</div>
			<div className=" flex gap-3 uppercase items-center text-xs mb-2 text-primary/80 tracking-widest">
				<SlashIcon size={14} className="rotate-45" />
				<span>Grab the popcorn</span>
				<SlashIcon size={14} className="rotate-45" />
			</div>
			<h3 className="text-5xl font-fraunces max-w-100">Welcome to your personal cinema,</h3>
			<span className="text-5xl italic font-fraunces font-normal text-primary">
				{profileName}
			</span>
			<p className="text-muted-foreground max-w-90 text-sm">
				Your home screen is ready with recommendations made just for you.
			</p>
			<div className="flex mt-3 uppercase text-xs text-muted-foreground items-center gap-1 justify-center max-w-130 flex-wrap">
				{selectedGenres.map((genre, index) => {
					const { label } = useGenresLabel(genre);
					return (
						<React.Fragment key={`index-${genre}`}>
							<span>{label}</span>
							{index + 1 < selectedGenres.length ? <Dot size={13} /> : null}
						</React.Fragment>
					);
				})}
			</div>
			<Button
				size={"lg"}
				disabled={isSaving}
				className="cursor-pointer gap-0 mt-5"
				variant={"default"}
				onClick={async () => {
					setIsSaving(true);
					const { error } = await saveOnboardingProfile({
						name: profileName ?? "",
						avatarUrl: avatarSrc,
						genres: selectedGenres,
					});
					setIsSaving(false);
					if (error) {
						appToast.error(error);
						return;
					}
					appToast.success("You're ready to start streaming!");

					router.push("/");
				}}
			>
				{!isSaving ? (
					<>
						<p>
							Enter Ham<span className="-translate-y-1">+</span>Hum
						</p>
						<ChevronRight className="ml-2" />
					</>
				) : (
					<p>Saving profile...</p>
				)}
			</Button>
		</div>
	);
};

export default OnboardingThird;
