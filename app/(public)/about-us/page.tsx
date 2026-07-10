import BasicHeader from "@/components/basic-header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Ham+Hum — About Us",
};

const AboutUsPage = ({}) => {
	return (
		<div className="w-full max-w-180 px-5 flex flex-col gap-10 mx-auto py-10 mt-10 text-foreground relative">
			<BasicHeader
				sticker="Information"
				title="About us"
				description="Ham+Hum is a personal streaming project built around one idea: a home for the movies
				and shows you actually watch, without the noise."
			/>

			<div className="flex flex-col gap-8">
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						Who we are
					</h6>
					<p className="text-muted-foreground text-sm">
						Ham+Hum is a personal portfolio project — a movie and show browsing site
						built to explore what a clean, fast streaming-style interface could look
						like. It's not a company or a product, just one developer's take on building
						something Netflix-shaped from scratch.
					</p>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold section-title-line mb-3">
						What we offer
					</h6>
					<p className="text-muted-foreground text-sm">
						Ham+Hum lets you browse trending and popular titles, search by genre, and
						keep a personal watchlist — all pulled live from TMDB's catalog. There is
						video streaming here.
					</p>
					<div className="grid gap-3 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						<div className="flex flex-col p-6 px-8 border bg-chart-5/20 rounded-md">
							<span className="text-primary text-2xl font-bold">TMDB</span>
							<span>Live catalog Data</span>
						</div>
						<div className="flex flex-col p-6 px-8 border bg-chart-5/20 rounded-md">
							<span className="text-primary text-2xl font-bold">Browse</span>
							<span>Watchlist storage</span>
						</div>
						<div className="flex flex-col p-6 px-8 border bg-chart-5/20 rounded-md">
							<span className="text-primary text-2xl font-bold">Watch</span>
							<span>Pick then Watch</span>
						</div>
					</div>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					<h6 className="text-foreground font-semibold mb-3 section-title-line">
						Data & attribution
					</h6>
					<p className="text-muted-foreground text-sm">
						Movie and show metadata is provided by{" "}
						<Link
							href="https://www.themoviedb.org/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							TMDB
						</Link>{" "}
						. Ham+Hum is not endorsed or certified by TMDB, and is not affiliated with
						any streaming service.
					</p>
				</section>
			</div>

			<section className="p-6 flex flex-col gap-2 border rounded-xl bg-border/40 text-center mt-5">
				<p className="text-2xl font-fraunces font-semibold">Get in Touch</p>
				<p className="text-primary text-pretty">
					This is a portfolio project — if you'd like to get in touch, find me on GitHub.
				</p>
				<Link
					href="https://github.com/humbledog30"
					target="_blank"
					className=" bg-primary w-fit mx-auto hover:bg-primary/70 items-center rounded-lg mt-3 flex gap-2 p-2 px-6 hover:decoration-primary transition"
				>
					View on GitHub
					<ChevronRight size={18} />
				</Link>
			</section>
		</div>
	);
};

export default AboutUsPage;
