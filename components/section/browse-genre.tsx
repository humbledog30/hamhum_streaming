"use client";
import { LayoutGrid } from "lucide-react";
import { NextPage } from "next";

const movieData = [
	{
		src: "https://image.tmdb.org/t/p/original/54KIfdTEzOliHDKx0OkzYGqAICx.jpg",
		alt: "Supergirl",
		genre: "Action",
		size: "lg:col-span-3",
	},
	{
		src: "https://image.tmdb.org/t/p/original/u53UYu5XG2hNgWGvs3xGhAVzypl.jpg",
		alt: "Hoppers",
		genre: "Comedy",
		size: "sm:col-span-3 lg:col-span-2",
	},
	{
		src: "https://image.tmdb.org/t/p/original/3eUyLEF5M0ky3h6KJsWiWzaakB8.jpg",
		alt: "The Scream 7",
		genre: "Horror",
		size: "sm:col-span-3 lg:col-span-1",
	},
	{
		src: "https://image.tmdb.org/t/p/original/nHKscpZcAPkh97OsJJjyE5yaVE0.jpg",
		alt: "Wuthering Heights",
		genre: "Drama",
		size: "sm:col-span-3 lg:col-span-3",
	},
	{
		src: "https://image.tmdb.org/t/p/original/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg",
		alt: "Project Hail Mary",
		genre: "Sci-fi",
		size: "sm:col-span-3 lg:col-span-3",
	},
	{
		src: "https://image.tmdb.org/t/p/original/rw1WmxUvmbwRsbAX12m6toIg04j.jpg",
		alt: "The Drama",
		genre: "Romance",
		size: "sm:col-span-3 lg:col-span-1",
	},
	{
		src: "https://image.tmdb.org/t/p/original/usm4v5TiU8wkK32WGVSDPY9CvCF.jpg",
		alt: "Marc by Sofia Coppola",
		genre: "Documentary",
		size: "sm:col-span-3 lg:col-span-2",
	},
	{
		src: "https://image.tmdb.org/t/p/original/hO2jx1H3XafR7Y8QbFgVH1sHTY9.jpg",
		alt: "Send Help",
		genre: "Thiller",
		size: "sm:col-span-6 lg:col-span-1",
	},
	{
		src: "https://image.tmdb.org/t/p/original/mQZJoIhTEkNhCYAqcHrQqhENLdu.jpg",
		alt: "Wild Robot",
		genre: "Animation",
		size: "sm:col-span-6 lg:col-span-2",
	},
];

interface movieProps {
	src: string;
	alt: string;
	genre: string;
	size: string;
}
const BrowseGenre = ({}) => {
	return (
		<section className="py-5 section-container">
			<div className="flex gap-5 flex-col w-full">
				<div className="flex items-center gap-5">
					<h6 className="section-title text-nowrap flex items-center gap-3">
						<LayoutGrid />
						Browse by Genre
					</h6>
					<div className=" border-b border-foreground/80 w-full" />
				</div>

				<div className="w-full grid grid-cols-6 gap-3 mx-auto text-2xl font-fraunces font-medium uppercase">
					{movieData.map((item: movieProps, index: number) => {
						return (
							<div
								key={`genre-cards-${index}`}
								className={`col-span-6 ${item.size} genre-cards relative`}
							>
								<img
									className="absolute left-0 top-0 z-0 w-full h-full object-cover"
									src={item.src}
									alt={item.alt}
								/>
								<div className="absolute inset-0 left-0 top-0 z-10 bg-linear-to-t from-background/80 from-20% to-primary/20"></div>
								<p className="relative z-20">{item.genre}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default BrowseGenre;
