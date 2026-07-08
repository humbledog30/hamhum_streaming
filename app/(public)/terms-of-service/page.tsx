import Link from "next/link";

export const metadata = {
	title: "Terms of Service — Hamhum+",
};

const TermsOfServicePage = ({}) => {
	return (
		<div className="section-container mx-auto py-10 mt-10 text-foreground">
			<p className="uppercase font-bold text-primary mb-6">Legal</p>
			<h1 className="font-fraunces text-4xl md:text-5xl font-semibold mb-3">
				Terms of Service
			</h1>

			<p className=" text-foreground/50 mb-14 leading-relaxed">
				Hamhum+ is a demonstration project and is not for commercial use.{" "}
				<span className="text-foreground/30">Last updated: July 8, 2026</span>
			</p>

			<div className="flex flex-col gap-12 leading-relaxed text-foreground/60">
				<section>
					<h3 className="text-foreground font-semibold  mb-3 section-title-line">
						Acceptance of terms
					</h3>
					<p>
						By accessing or using Hamhum+, you agree to these Terms of Service. This
						site is a personal portfolio project, provided as-is for demonstration
						purposes. If you don't agree with these terms, please discontinue use of the
						site.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Use of the service
					</h3>
					<ul className="flex flex-col gap-2.5">
						{[
							"Hamhum+ is provided for personal, non-commercial, demonstration purposes only, as part of a developer's portfolio",
							"The site displays metadata and artwork sourced from TMDB; video playback is provided via third-party embedded sources not operated by Ham+Hum",
							"You agree not to misuse the service, including scraping, excessive automated requests, or attempting to disrupt the site",
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
					<h3 className="text-foreground font-semibold section-title-line mb-3">
						Accounts
					</h3>
					<p>
						Creating a watchlist requires an account. You're responsible for keeping
						your login credentials secure and for all activity under your account.
						Account data, including your watchlist and preferences, is stored in our
						database (hosted via Supabase) and is deleted if you delete your account.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Intellectual property
					</h3>
					<p>
						All film and series metadata, artwork, and ratings are provided by{" "}
						<Link
							href="https://www.themoviedb.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							The Movie Database (TMDB)
						</Link>{" "}
						and remain the property of their respective owners. The Hamhum+ name,
						design, and original code are the work of the developer and shared for
						portfolio and educational purposes.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Disclaimer of warranties
					</h3>
					<p>
						Hamhum+ is provided "as is," without warranties of any kind, express or
						implied. As a personal portfolio project, it may contain bugs, incomplete
						features, or occasional downtime, and there's no guarantee of uninterrupted
						or error-free operation.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Limitation of liability
					</h3>
					<p>
						To the fullest extent permitted by law, the creator of Hamhum+ is not liable
						for any direct, indirect, incidental, or consequential damages arising from
						your use of, or inability to use, the site.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold section-title-line mb-3">
						Termination
					</h3>
					<p>
						As this is a personal project rather than a commercial service, access may
						be modified, suspended, or discontinued at any time without notice, at the
						developer's discretion.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold section-title-line mb-3 section-title-line">
						Changes to these terms
					</h3>
					<p>
						These terms may be updated as the project evolves. Any changes will be
						reflected on this page with a revised "last updated" date.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold section-title-line mb-3 ">
						Governing law
					</h3>
					<p>
						These terms are governed by the laws of the developer's home jurisdiction,
						without regard to conflict-of-law principles.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-3 section-title-line">
						Contact
					</h3>
					<p className="p-6 rounded-md bg-chart-5/20 border">
						Questions about these terms can be sent to{" "}
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

export default TermsOfServicePage;
