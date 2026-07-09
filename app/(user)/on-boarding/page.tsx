"use client";
import BrandLogo from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { genreIcons, genreList, useGenresLabel } from "@/lib/hooks/useGenresLabel";
import { Check, ChevronLeft, ChevronRight, LayoutGrid, SlashIcon, User, Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const steps = [
	{ icon: <User size={14} />, label: "Profile" },
	{ icon: <LayoutGrid size={14} />, label: "Genres" },
	{ icon: <Check size={14} />, label: "Ready" },
];

const profileAvatar = [
	{ src: "/avatar/P1.png", alt: "Profile Avatar 1" },
	{ src: "/avatar/P2.png", alt: "Profile Avatar 2" },
	{ src: "/avatar/P3.png", alt: "Profile Avatar 3" },
	{ src: "/avatar/P4.png", alt: "Profile Avatar 4" },
	{ src: "/avatar/P5.png", alt: "Profile Avatar 5" },
	{ src: "/avatar/P6.png", alt: "Profile Avatar 6" },
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
									className="cursor-pointer flex gap-2 text-sm border-foreground/40 border p-1 px-4 items-center rounded-3xl profile-step duration-300 transition-all"
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
						<Button
							className="rounded-2xl cursor-pointer"
							size="sm"
							variant="outline"
							onClick={() => router.push("/")}
						>
							Skip
						</Button>
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
						<div
							data-step={1 === activeStep ? "active" : "inactive"}
							className="profile-step-1 hidden data-[step=active]:flex flex-col items-center gap-4 py-6"
						>
							<div className=" flex gap-3 uppercase items-center text-xs mb-2 text-primary/80 tracking-widest">
								<SlashIcon size={14} className="rotate-45" />
								<span>Step 1 of 3</span>
								<SlashIcon size={14} className="rotate-45" />
							</div>
							<h3 className="text-5xl font-fraunces font-semibold">
								Who's watching{" "}
								<span className="italic font-normal text-muted-foreground">
									tonight?
								</span>
							</h3>
							<p className="text-muted-foreground max-w-95">
								Pick a profile that feels like you.
							</p>
							<div className="mt-5 flex flex-col items-center gap-5">
								<div className="size-33 border border-primary rounded-full dark:bg-foreground/30 bg-muted-foreground/20">
									<img
										className="w-full h-full"
										src={avatarSrc}
										alt="User Profile"
									/>
								</div>
								<div className="flex flex-wrap gap-3 justify-center">
									{profileAvatar.map((item, index) => (
										<div
											key={`profile-avatar-${index}`}
											data-state={
												index === activeIndex ? "active" : "inactive"
											}
											className="profile-select size-12 border border-primary rounded-full dark:bg-foreground/30  transition-all duration-300 bg-muted-foreground/20 data-[state=active]:scale-105 hover:dark:bg-primary hover:bg-primary data-[state=active]:dark:bg-primary data-[state=active]:bg-primary"
										>
											<img
												onClick={(e) => {
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
						<div
							data-step={2 === activeStep ? "active" : "inactive"}
							className="profile-step-2 hidden data-[step=active]:flex flex-col items-center gap-4 py-6"
						>
							<div className=" flex gap-3 uppercase items-center text-xs mb-2 text-primary/80 tracking-widest">
								<SlashIcon size={14} className="rotate-45" />
								<span>Step 2 of 3</span>
								<SlashIcon size={14} className="rotate-45" />
							</div>
							<h3 className="text-5xl font-fraunces font-semibold">
								What do you love{" "}
								<span className="italic font-normal text-muted-foreground">
									watching?
								</span>
							</h3>
							<p className="text-muted-foreground max-w-90 text-sm">
								Pick at least three — we'll shape your home rows around your taste.
							</p>
							<div className="mt-5 text-muted-foreground/90  flex items-center justify-center flex-wrap gap-3 max-w-200">
								{genreList.map((genre, index) => {
									const Icon = genreIcons[genre.id];
									return (
										<button
											onClick={() => {
												setSelectedGenres((prev) => {
													if (prev.includes(genre.id)) {
														return prev.filter(
															(item) => item !== genre.id,
														);
													}
													return [...prev, genre.id];
												});
											}}
											data-genre={
												selectedGenres.includes(genre.id)
													? "active"
													: "inactive"
											}
											className="cursor-pointer data-[genre=active]:from-background/80 data-[genre=active]:to-primary bg-linear-to-br data-[genre=active]:text-foreground flex gap-2 bg-muted-foreground/15 border-muted-foreground/90 border p-2 px-5 rounded-3xl text-sm items-center transition-all duration-150"
											key={`genre-badge-${genre.id}`}
										>
											<Icon size={14} />
											{genre.name}
										</button>
									);
								})}
							</div>
							<p className="uppercase text-xs flex items-center gap-1 mt-3 tracking-wider text-foreground/40">
								<span className="text-primary font-bold text-sm">
									{selectedGenres.length}
								</span>{" "}
								selected · at least 3 to continue
							</p>
						</div>
						<div
							data-step={3 === activeStep ? "active" : "inactive"}
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
							<h3 className="text-5xl font-fraunces max-w-100">
								Welcome to your personal cinema,
							</h3>
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
											<span key={`index-${genre}`}>{label}</span>
											{index + 1 < selectedGenres.length ? (
												<Dot size={13} />
											) : null}
										</React.Fragment>
									);
								})}
							</div>
							<Button
								size={"lg"}
								className="cursor-pointer rounded-3xl gap-0 mt-5"
								variant={"default"}
								onClick={() => {
									console.log(selectedGenres);
									console.log(profileName);
									console.log(avatarSrc);
									router.push("/");
								}}
							>
								Enter Ham
								<span className="-translate-y-1">+</span>
								Hum
								<ChevronRight className="ml-2" />
							</Button>
						</div>
					</div>

					{/* On Boarding Footer */}
					<div
						data-button={activeStep === 3 ? "hidden" : "visible"}
						className="data-[button=visible]:flex items-center hidden justify-between border-t border-foreground/20 py-6"
					>
						<Button
							data-button-back={activeStep === 2 ? "visible" : "hidden"}
							size={"lg"}
							className="cursor-pointer rounded-3xl invisible data-[button-back=visible]:visible w-37.5"
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
							className="cursor-pointer rounded-3xl w-37.5"
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
