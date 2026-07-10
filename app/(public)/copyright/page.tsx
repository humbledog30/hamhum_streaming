import BasicHeader from "@/components/basic-header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Ham+Hum — Copyright & DMCA Notice",
};

const CopyrightPage = ({}) => {
	return (
		<div className="w-full max-w-180 px-5 flex flex-col gap-10 mx-auto py-10 mt-10 text-foreground relative">
			<BasicHeader
				sticker="Legal"
				title="Copyright &amp; DMCA Notice"
				description="How we handle copyright, third-party data, and takedown requests on Ham+Hum."
			/>

			<div className="flex flex-col gap-8">
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						Site content
					</h6>
					<p className="text-muted-foreground text-sm">
						The Ham+Hum name, logo, interface design, and original code are the property
						of Ham+Hum. Ham+Hum is a demonstration project and is not for commercial
						use.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						Third-party data &amp; attribution
					</h6>
					<p className="text-muted-foreground text-sm">
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
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						DMCA takedown requests
					</h6>
					<p className="text-muted-foreground text-sm mb-4">
						If you are a copyright owner, or authorized to act on behalf of one, and
						believe that material available on Ham+Hum infringes your copyright, you may
						submit a notice under the Digital Millennium Copyright Act (17 U.S.C. § 512)
						by providing the following to our designated contact below:
					</p>
					<ul className="text-muted-foreground text-sm flex flex-col gap-2.5">
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
			</div>

			<section className="p-6 flex flex-col gap-2 border rounded-xl bg-border/40 text-center mt-5">
				<p className="text-2xl font-fraunces font-semibold">Designated Contact</p>
				<p className="text-primary text-pretty">
					Send DMCA notices to the email below and we'll review and respond in a timely
					manner.
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

export default CopyrightPage;
