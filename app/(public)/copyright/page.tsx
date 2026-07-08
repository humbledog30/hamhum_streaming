import Link from "next/link";

export const metadata = {
	title: "Copyright & DMCA Notice — Hamhum+",
};

const CopyrightPage = ({}) => {
	return (
		<div className="section-container mx-auto py-10 mt-10 text-foreground">
			<p className="uppercase font-bold text-primary mb-6">Legal</p>
			<h1 className="font-fraunces text-4xl md:text-5xl font-semibold mb-3">
				Copyright &amp; DMCA Notice
			</h1>
			<p className=" text-foreground/50 mb-14 leading-relaxed">
				How we handle copyright, third-party data, and takedown requests on Hamhum+.
			</p>

			<div className="flex flex-col gap-12 leading-relaxed text-foreground/60">
				<section>
					<h3 className="text-foreground font-semibold mb-4 section-title-line">
						Site content
					</h3>
					<p>
						The Hamhum+ name, logo, interface design, and original code are the property
						of Hamhum+. Hamhum+ is a demonstration project and is not for commercial
						use.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-4 section-title-line">
						Third-party data &amp; attribution
					</h3>
					<p>
						This product uses the TMDB API but is not endorsed or certified by TMDB.
						Movie and series titles, artwork, descriptions, and related metadata are
						sourced from{" "}
						<Link
							href="https://www.themoviedb.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							The Movie Database (TMDB)
						</Link>{" "}
						and remain the property of their respective copyright holders, including
						studios, distributors, and content owners.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-4 section-title-line">
						DMCA takedown requests
					</h3>
					<p className="mb-4">
						If you are a copyright owner, or authorized to act on behalf of one, and
						believe that material available on Hamhum+ infringes your copyright, you may
						submit a notice under the Digital Millennium Copyright Act (17 U.S.C. § 512)
						by providing the following to our designated contact below:
					</p>
					<ul className="flex flex-col gap-2.5">
						{[
							"A physical or electronic signature of the copyright owner or authorized representative",
							"Identification of the copyrighted work claimed to have been infringed",
							"Identification of the material you claim is infringing, with enough detail for us to locate it on the site",
							"Your contact information (address, phone number, email)",
							"A statement that you have a good-faith belief the use is not authorized by the copyright owner, its agent, or the law",
							"A statement, made under penalty of perjury, that the above information is accurate and that you are the copyright owner or authorized to act on their behalf",
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
					<h3 className="text-foreground font-semibold mb-4 section-title-line">
						Designated contact
					</h3>
					<p className="p-6 rounded-md bg-chart-5/20 border">
						Send DMCA notices to{" "}
						<Link
							href="mailto:hamhum.plus2026@gmail.com"
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							hamhum.plus2026@gmail.com
						</Link>
						. We will review and respond to valid notices in a timely manner.
					</p>
				</section>
			</div>
		</div>
	);
};

export default CopyrightPage;
