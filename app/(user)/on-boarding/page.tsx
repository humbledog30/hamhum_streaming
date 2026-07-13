"use client";
import BrandLogo from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight, LayoutGrid, SlashIcon, User, Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import OnboardingFirst from "./components/onboarding-first";
import OnboardingSecond from "./components/onboarding-second";
import OnboardingThird from "./components/onboarding-third";

const steps = [
	{ icon: <User size={14} />, label: "Profile" },
	{ icon: <LayoutGrid size={14} />, label: "Genres" },
	{ icon: <Check size={14} />, label: "Ready" },
];

export default function Page() {
	const [avatarSrc, setAvatarSrc] = useState<string>("/avatar/P1.png");
	const [profileName, setProfileName] = useState<string | undefined>("");
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeStep, setActiveStep] = useState(1);
	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
	const router = useRouter();

	return (
		<main className="min-h-screen flex flex-col">
			<nav className="w-full z-50 bg-background flex justify-center flex-col h-18">
				<div className="w-full section-container flex justify-between items-center py-3">
					{/* On Boarding Brand Logo */}
					<div className="font-semibold">
						<BrandLogo />
					</div>
					{/* On Boarding Step */}
					<div className="hidden md:flex items-center gap-3 text-foreground/40">
						{steps.map((item, index) => (
							<React.Fragment key={`step-${index}`}>
								<Button
									variant={"outline"}
									data-step-indicator={
										activeStep === index + 1 ? "active" : "inactive"
									}
									onClick={() => {
										if (index + 1 < 3 || selectedGenres.length >= 3) {
											setActiveStep(index + 1);
											return;
										}
									}}
									className="cursor-pointer flex gap-2 text-sm border-foreground/40 border p-1 px-4 items-center profile-step duration-300 transition-all"
								>
									{item.icon}
									<span>{item.label}</span>
								</Button>
								{index + 1 < steps.length ? (
									<span className="w-5 h-px bg-foreground/40"></span>
								) : null}
							</React.Fragment>
						))}
					</div>
					{/* On Boarding Skip */}
					<div className="w-fit lg:w-38.75 flex justify-end">
						{/* <Button
							className=" cursor-pointer"
							size="sm"
							variant="outline"
							onClick={() => router.push("/")}
						>
							Skip
						</Button> */}
					</div>
				</div>
			</nav>
			<div className="w-full flex-1 flex">
				<div className="section-container flex-1 flex flex-col gap-4 w-full justify-center">
					{/* On Boarding Progress bar */}
					<div className="h-0.5 w-full bg-foreground/10">
						<div
							data-progress={activeStep}
							className="h-0.5 data-[progress=1]:w-[33%] data-[progress=2]:w-[66%] data-[progress=3]:w-full bg-primary duration-300 transition-all"
						/>
					</div>

					{/* On Boarding Wizard */}
					<div className="m-auto text-center">
						<OnboardingFirst
							isActive={activeStep === 1}
							avatarSrc={avatarSrc}
							setAvatarSrc={setAvatarSrc}
							profileName={profileName}
							setProfileName={setProfileName}
							activeIndex={activeIndex}
							setActiveIndex={setActiveIndex}
						/>
						<OnboardingSecond
							isActive={activeStep === 2}
							selectedGenres={selectedGenres}
							setSelectedGenres={setSelectedGenres}
						/>
						<OnboardingThird
							isActive={activeStep === 3}
							avatarSrc={avatarSrc}
							profileName={profileName}
							selectedGenres={selectedGenres}
						/>
					</div>

					{/* On Boarding Footer */}
					<div
						data-button={activeStep === 3 ? "hidden" : "visible"}
						className="data-[button=visible]:flex items-center hidden justify-between border-t border-foreground/20 py-6"
					>
						<Button
							data-button-back={activeStep === 2 ? "visible" : "hidden"}
							size={"lg"}
							className="cursor-pointer invisible data-[button-back=visible]:visible w-37.5"
							variant={"outline"}
							onClick={() => {
								if (activeStep < 3) {
									setActiveStep(activeStep - 1);
								}
							}}
						>
							<ChevronLeft /> Back
						</Button>

						<div className="flex gap-2 text-foreground/40 text-sm">
							<span>0{activeStep}</span>/<span>03</span>
						</div>
						<Button
							size={"lg"}
							className="cursor-pointer w-37.5"
							disabled={selectedGenres.length < 3 && activeStep === 2}
							variant={"default"}
							onClick={() => {
								if (activeStep < 3) {
									setActiveStep(activeStep + 1);
								}
							}}
						>
							{activeStep === 2 ? "Finish" : "Continue"} <ChevronRight />
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
