import Link from "next/link";

const PrivacyPolicy = ({}) => {
	return (
		<div className="section-container mx-auto py-10 mt-10 text-foreground">
			<p className="uppercase font-bold text-primary mb-6">Legal</p>
			<h1 className="font-fraunces text-4xl md:text-5xl font-semibold mb-3">
				Privacy Policy
			</h1>
			<p className=" text-foreground/50 mb-14 leading-relaxed">
				How Hamhum+ handles data, storage, and third-party services.{" "}
				<span className="text-foreground/30">Last updated: July 8, 2026</span>
			</p>

			<div className="flex flex-col gap-12 leading-relaxed text-foreground/60">
				<section>
					<h3 className="text-foreground font-semibold section-title-line mb-3">
						Information we collect
					</h3>
					<p>
						When you create an account on Hamhum+, we collect your email address and any
						profile details you provide. We also store your watchlist, ratings, and
						preferences, tied to your account so they're available across devices. This
						data is stored in a Supabase-hosted database rather than only in your
						browser.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold section-title-line mb-3">
						How we use information
					</h3>
					<ul className="flex flex-col gap-2.5">
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

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Cookies &amp; tracking
					</h3>
					<p>
						Hamhum+ uses a small number of essential cookies to keep you signed in and
						maintain your session. We don't use advertising or third-party tracking
						cookies. Some non-account preferences may still be cached locally in your
						browser for performance.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Third-party services
					</h3>
					<p>
						Hamhum+ uses{" "}
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

				<section>
					<h3 className="text-foreground font-semibold section-title-line mb-3">
						Data sharing
					</h3>
					<p>
						We don't sell your data. Your account information and watchlist are stored
						with our infrastructure providers (Supabase) solely to operate the service,
						and are not shared with advertisers or unrelated third parties. Data may be
						disclosed if required by law.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold section-title-line mb-3 ">
						Data retention
					</h3>
					<p>
						We retain your account data and watchlist for as long as your account is
						active. If you delete your account, we'll delete your associated data from
						our database within a reasonable period, except where retention is required
						for legal or security reasons.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Your rights
					</h3>
					<p>
						You can request access to, correction of, or deletion of your account data
						at any time by contacting us. Since your data is tied to your account,
						deleting your account removes your watchlist and profile information from
						our systems.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Children's privacy
					</h3>
					<p>
						Hamhum+ is not directed at children under 13, and we do not knowingly
						collect data from children. If we become aware that a child has created an
						account, we will delete it.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Changes to this policy
					</h3>
					<p>
						As this project evolves, this policy may be updated to reflect new features
						or data practices. Any changes will be posted on this page with a revised
						"last updated" date.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Contact
					</h3>
					<p className="p-6 rounded-md bg-chart-5/20 border">
						Questions about this policy, or requests to access or delete your data, can
						be sent to{" "}
						<Link
							href="mailto:hamhum.plus2026@gmail.com"
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							hamhum.plus2026@gmail.com
						</Link>
						.
					</p>
				</section>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
