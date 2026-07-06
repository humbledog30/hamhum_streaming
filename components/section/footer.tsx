import { NextPage } from "next";
import { ThemeSwitcher } from "../theme-switcher";
import Link from "next/link";
import { Dot, Mail } from "lucide-react";
import { FiGithub } from "react-icons/fi";

const Footer = ({}) => {
	return (
		<footer className="w-full flex flex-col border-t border-foreground/20 mx-auto text-xs p-10 mt-20">
			<div className="container mx-auto">
				<div className=" w-full flex flex-wrap items-start justify-between gap-8">
					<div>
						<div className="flex gap-5 items-center font-semibold">
							<Link className="flex text-3xl font-fraunces" href={"/"}>
								Ham
								<span className="text-primary font-extrabold text-2xl -mt-2 -ml-1 block">
									+
								</span>
								Hum
							</Link>
						</div>
						<p className="text-sm text-foreground/50 mt-2 max-w-65 leading-relaxed">
							Your own screening room — built around what you actually watch.
						</p>
					</div>

					<div className="flex flex-col items-start sm:items-end gap-4">
						<div className="flex items-center gap-2 text-sm text-foreground/70">
							Data Owned by
							<img
								src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
								alt="TMDB"
								className="h-4"
							/>
						</div>
						<div className="flex items-center gap-2">
							<ThemeSwitcher />
							<span className="w-px h-4 bg-white/10" />
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
				</div>

				<div className="h-px bg-white/10 my-8" />

				<div className="flex flex-wrap items-center justify-between gap-3 text-xs text-foreground/40">
					<p>© 2026 HamHum. All rights reserved.</p>
					<p>Not for commercial use.</p>
				</div>
			</div>
			{/* <ThemeSwitcher /> */}
		</footer>
	);
};

export default Footer;
