import { NextPage } from "next";
import { ThemeSwitcher } from "../theme-switcher";
import Link from "next/link";
import { Dot, Mail } from "lucide-react";
import { FiGithub } from "react-icons/fi";

const Footer = ({}) => {
	return (
		<footer className="w-full flex flex-col border-t border-foreground/20 mx-auto text-xs py-1">
			<div className="section-container">
				<div className="mb-3">
					<div className="flex items-center font-semibold">
						<Link className="flex text-3xl font-fraunces" href={"/"}>
							<img
								className="hidden dark:block h-25"
								src="/Portrait-Dark-mode.png"
								alt="Brand Logo Dark"
							/>
							<img
								className="block dark:hidden h-25"
								src="/Portrait-Light-mode.png"
								alt="Brand Logo Light"
							/>
						</Link>
					</div>
				</div>
				<div className=" w-full flex flex-wrap items-start justify-between gap-8 mb-15">
					<div className="flex gap-5 flex-col">
						<div>
							<p className="text-base text-foreground/50 mt-2 max-w-80 leading-relaxed">
								Your own screening room — built around what you actually watch.
							</p>
						</div>

						<div className="flex items-center gap-2">
							<ThemeSwitcher />
							<a
								href="https://github.com/your-repo"
								target="_blank"
								rel="noopener"
								className="w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition"
							>
								<FiGithub className="w-4 h-4" />
							</a>
							<a
								href="mailto:hello@hamhum.app"
								className="w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition"
							>
								<Mail className="w-4 h-4" />
							</a>
						</div>
					</div>
					<div className="text-base text-foreground/50 flex flex-wrap gap-20">
						<div>
							<p className="mb-4 uppercase text-sm font-semibold">Browse</p>
							<ul className="text-foreground flex flex-col gap-3">
								<li>
									<Link href={"#"}>Genres</Link>
								</li>
								<li>
									<Link href={"#"}>New Releases</Link>
								</li>
								<li>
									<Link href={"#"}>Upcoming Releases</Link>
								</li>
								<li>
									<Link href={"#"}>My List</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="mb-4 uppercase text-sm font-semibold">Information</p>
							<ul className="text-foreground flex flex-col gap-3">
								<li>
									<Link href={"/about-us"}>About us</Link>
								</li>
								<li>
									<Link href={"#"}>Contact</Link>
								</li>
							</ul>
						</div>
						<div>
							<p className="mb-4 uppercase text-sm font-semibold">Legal</p>
							<ul className="text-foreground flex flex-col gap-3">
								<li>
									<Link href={"/privacy-policy"}>Privacy Policy</Link>
								</li>
								<li>
									<Link href={"/terms-of-service"}>Terms of Service</Link>
								</li>
								<li>
									<Link href={"/copyright"}>Copyright & DMCA</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="h-px bg-foreground/10 my-6" />

				<div className="flex items-center flex-wrap justify-between gap-3 text-xs text-foreground/40">
					<p>© 2026 HamHum. All rights reserved. Not for commercial use.</p>
					{/* <p></p> */}
					<div className="flex items-center gap-2 text-xs text-foreground/40">
						<p>Uses the TMDB API. Not endorsed or certified by</p>
						<img
							src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
							alt="TMDB"
							className="h-4"
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
