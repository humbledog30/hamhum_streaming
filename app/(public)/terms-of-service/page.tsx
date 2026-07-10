import BasicHeader from "@/components/basic-header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Ham+Hum — Terms of Service",
};

const TermsOfServicePage = ({}) => {
	return (
		<div className="w-full max-w-180 px-5 flex flex-col gap-10 mx-auto py-10 mt-10 text-foreground relative">
			<BasicHeader
				sticker="Legal"
				title="Terms of Service"
				description="Ham+Hum is a demonstration project and is not for commercial use."
				footer="Last updated: July 8, 2026"
			/>

			<div className="flex flex-col gap-8">
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						Acceptance of terms
					</h6>
					<p className="text-muted-foreground text-sm">
						By accessing or using Ham+Hum, you agree to these Terms of Service. This
						site is a personal portfolio project, provided as-is for demonstration
						purposes. If you don't agree with these terms, please discontinue use of the
						site.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						Use of the service
					</h6>
					<ul className="flex flex-col gap-2.5 text-muted-foreground text-sm">
						{[
							"Ham+Hum is provided for personal, non-commercial, demonstration purposes only, as part of a developer's portfolio",
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
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Accounts
					</h6>
					<p className="text-muted-foreground text-sm">
						Creating a watchlist requires an account. You're responsible for keeping
						your login credentials secure and for all activity under your account.
						Account data, including your watchlist and preferences, is stored in our
						database (hosted via Supabase) and is deleted if you delete your account.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Intellectual property
					</h6>
					<p className="text-muted-foreground text-sm">
						All film and series metadata, artwork, and ratings are provided by{" "}
						<Link
							href="https://www.themoviedb.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							The Movie Database (TMDB)
						</Link>{" "}
						and remain the property of their respective owners. The Ham+Hum name,
						design, and original code are the work of the developer and shared for
						portfolio and educational purposes.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Disclaimer of warranties
					</h6>
					<p className="text-muted-foreground text-sm">
						Ham+Hum is provided "as is," without warranties of any kind, express or
						implied. As a personal portfolio project, it may contain bugs, incomplete
						features, or occasional downtime, and there's no guarantee of uninterrupted
						or error-free operation.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Limitation of liability
					</h6>
					<p className="text-muted-foreground text-sm">
						To the fullest extent permitted by law, the creator of Ham+Hum is not liable
						for any direct, indirect, incidental, or consequential damages arising from
						your use of, or inability to use, the site.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Termination
					</h6>
					<p className="text-muted-foreground text-sm">
						As this is a personal project rather than a commercial service, access may
						be modified, suspended, or discontinued at any time without notice, at the
						developer's discretion.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Changes to these terms
					</h6>
					<p className="text-muted-foreground text-sm">
						These terms may be updated as the project evolves. Any changes will be
						reflected on this page with a revised "last updated" date.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Governing law
					</h6>
					<p className="text-muted-foreground text-sm">
						These terms are governed by the laws of the developer's home jurisdiction,
						without regard to conflict-of-law principles.
					</p>
				</section>
			</div>

			<section className="p-6 flex flex-col gap-2 border rounded-xl bg-border/40 text-center mt-5">
				<p className="text-2xl font-fraunces font-semibold">Questions?</p>
				<p className="text-primary text-pretty">
					Questions about these terms? Just reach out — we'll get back to you.
				</p>
				<Link
					href="mailto:hamhum.plus2026@gmail.com"
					target="_blank"
					className=" bg-primary w-fit mx-auto hover:bg-primary/70 items-center rounded-lg mt-3 flex gap-2 p-2 px-6 hover:decoration-primary transition"
				>
					Contact Us
					<ChevronRight size={18} />
				</Link>
			</section>
		</div>
	);
};

export default TermsOfServicePage;
