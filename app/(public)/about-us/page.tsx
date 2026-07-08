import Link from "next/link";

const AboutUsPage = ({}) => {
	return (
		<div className="section-container mx-auto py-10 mt-10 text-foreground">
			<p className="uppercase font-bold text-primary mb-6">Information</p>
			<h1 className="font-fraunces text-4xl md:text-5xl font-semibold mb-3">About us</h1>
			<p className=" text-foreground/50 mb-14 leading-relaxed">
				Ham+Hum is a personal streaming project built around one idea: a home for the movies
				and shows you actually watch, without the noise.
			</p>

			<div className="flex flex-col gap-12 leading-relaxed text-foreground/60">
				<section>
					<h3 className="text-foreground font-semibold mb-4 section-title-line">
						Who we are
					</h3>
					<p>
						Ham+Hum is a personal portfolio project — a movie and show browsing site
						built to explore what a clean, fast streaming-style interface could look
						like. It's not a company or a product, just one developer's take on building
						something Netflix-shaped from scratch.
					</p>
				</section>

				<section>
					<h3 className="text-foreground font-semibold mb-4 section-title-line">
						What we offer
					</h3>
					<p>
						Ham+Hum lets you browse trending and popular titles, search by genre, and
						keep a personal watchlist — all pulled live from TMDB's catalog. There is
						video streaming here.
					</p>
					<div className="flex gap-3 mt-6 flex-wrap">
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

				<section>
					<h3 className="text-foreground font-semibold mb-4 section-title-line">
						Data & attribution
					</h3>
					<p className="mb-4">
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

				<section>
					<h3 className="text-foreground font-semibold mb-4 section-title-line">
						Contact
					</h3>
					<p className="p-6 rounded-md bg-chart-5/20 border">
						This is a portfolio project — if you'd like to get in touch, check out the
						code on{" "}
						<Link
							href="https://github.com/humbledog30"
							target={"_blank"}
							className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition"
						>
							GitHub
						</Link>
						. or reach out there.
					</p>
				</section>
			</div>
		</div>
	);
};

export default AboutUsPage;
