"use client";
import { NextPage } from "next";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";
import SwiperCarousel from "../swiper-carousel";

interface Props {}

const Trending: NextPage<Props> = ({}) => {
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);
	return (
		<section className="p-5 container flex flex-col gap-5 mx-auto">
			<div className="flex justify-between items-center gap-5 flex-wrap ">
				<h6 className="section-title flex gap-3 items-center ">Trending Now</h6>
				<div className="border-b border-foreground/80 flex-1"></div>
				<div className="flex gap-2 ">
					<Link
						href="#"
						className="flex items-center ml-auto gap-2 text-sm opacity-60 hover:opacity-100"
					>
						See all
						<MoveRight size={16} />
					</Link>
					<button
						type="button"
						ref={prevRef}
						className="border border-foreground rounded-full p-2 hover:opacity-100 opacity-60 transition"
					>
						<ChevronLeft size={14} />
					</button>
					<button
						type="button"
						ref={nextRef}
						className="border border-foreground rounded-full p-2 hover:opacity-100 opacity-60 transition"
					>
						<ChevronRight size={14} />
					</button>
				</div>
			</div>
			<div>
				<SwiperCarousel navigation={{ prevRef, nextRef }} />
			</div>
		</section>
	);
};

export default Trending;
