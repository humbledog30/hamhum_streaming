import BasicHeader from "@/components/basic-header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Ham+Hum — Privacy Policy",
};

const PrivacyPolicy = ({}) => {
	return (
		<div className="w-full max-w-180 px-5 flex flex-col gap-10 mx-auto py-10 mt-10 text-foreground relative">
			<BasicHeader
				sticker="Legal"
				title="Privacy Policy"
				description="How Ham+Hum handles data, storage, and third-party services."
				footer="Last updated: July 8, 2026"
			/>

			<div className="flex flex-col gap-8">
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						Information we collect
					</h6>
					<p className="text-muted-foreground text-sm">
						When you create an account on Ham+Hum, we collect your email address and any
						profile details you provide. We also store your watchlist, ratings, and
						preferences, tied to your account so they're available across devices. This
						data is stored in a Supabase-hosted database rather than only in your
						browser.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						How we use information
					</h6>
					<ul className="flex flex-col gap-2.5 text-muted-foreground text-sm">
						{[
							"To create and authenticate your account",
							"To save and sync your watchlist and preferences across sessions and devices",
							"To fetch movie and series details from TMDB when you browse or search",
							"To monitor and improve site performance",
							"We do not use your information to advertise, profile, or sell to third parties",
						].map((item, i) => (
							<li key={i} className="flex gap-3">
								<span className="text-primary font-mono text-xs mt-0.5 shrink-0">
									{String(i + 1).padStart(2, "0")}
								</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Cookies &amp; tracking
					</h6>
					<p className="text-muted-foreground text-sm">
						Ham+Hum uses a small number of essential cookies to keep you signed in and
						maintain your session. We don't use advertising or third-party tracking
						cookies. Some non-account preferences may still be cached locally in your
						browser for performance.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Third-party services
					</h6>
					<p className="text-muted-foreground text-sm">
						Ham+Hum uses{" "}
						<Link
							href="https://www.themoviedb.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							The Movie Database (TMDB)
						</Link>{" "}
						to source movie and series metadata and imagery,{" "}
						<Link
							href="https://supabase.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							Supabase
						</Link>{" "}
						to handle authentication and store account data, and Vercel for hosting.
						Each of these providers processes data on our behalf and maintains its own
						security and privacy practices.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						Data sharing
					</h6>
					<p className="text-muted-foreground text-sm">
						We don't sell your data. Your account information and watchlist are stored
						with our infrastructure providers (Supabase) solely to operate the service,
						and are not shared with advertisers or unrelated third parties. Data may be
						disclosed if required by law.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3 ">
						Data retention
					</h6>
					<p className="text-muted-foreground text-sm">
						We retain your account data and watchlist for as long as your account is
						active. If you delete your account, we'll delete your associated data from
						our database within a reasonable period, except where retention is required
						for legal or security reasons.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Your rights
					</h6>
					<p className="text-muted-foreground text-sm">
						You can request access to, correction of, or deletion of your account data
						at any time by contacting us. Since your data is tied to your account,
						deleting your account removes your watchlist and profile information from
						our systems.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Children's privacy
					</h6>
					<p className="text-muted-foreground text-sm">
						Ham+Hum is not directed at children under 13, and we do not knowingly
						collect data from children. If we become aware that a child has created an
						account, we will delete it.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Changes to this policy
					</h6>
					<p className="text-muted-foreground text-sm">
						As this project evolves, this policy may be updated to reflect new features
						or data practices. Any changes will be posted on this page with a revised
						"last updated" date.
					</p>
				</section>
			</div>

			<section className="p-6 flex flex-col gap-2 border rounded-xl bg-border/40 text-center mt-5">
				<p className="text-2xl font-fraunces font-semibold ">Questions?</p>
				<p className="text-primary text-pretty">
					Questions about this policy, or need to access or delete your data? Just reach
					out — we'll get back to you.
				</p>
				<Link
					href="mailto:hamhum.plus2026@gmail.com"
					className=" bg-primary w-fit mx-auto hover:bg-primary/70 items-center rounded-lg mt-3 flex gap-2 p-2 px-6 hover:decoration-primary transition"
				>
					Contact Us
					<ChevronRight size={18} />
				</Link>
			</section>
		</div>
	);
};

export default PrivacyPolicy;
