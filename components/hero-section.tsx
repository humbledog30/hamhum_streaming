import { NextPage } from "next";

interface Props {}

const HeroSection: NextPage<Props> = ({}) => {
	return (
		<div className="w-full h-[calc(100dvh-64px)] min-h-[600px] relative">
			{/* <div className="absolute inset-0 bg-line bg-gradient-to-t from-cyan-500 to-transparent z-10" /> */}
			<img
				className="w-full h-full object-cover absolute z-0"
				src="https://image.tmdb.org/t/p/original/4D1pdB27uph7J8HQzNf8QvvH9bn.jpg"
				alt="Toy Story 5"
			/>

			<div className="container h-full z-20 mx-auto relative flex flex-col justify-end pb-10">
				<div>
					<p>NOW STREAMING</p>
					<div className="meta-information"></div>
					<p className="text-8xl font-fraunces text-secondary">Toy Story 5</p>
				</div>
				<div>
					<p>
						"When Bonnie receives a Lilypad tablet as a gift and becomes obsessed, Buzz,
						Woody, Jessie and the rest of the gang's jobs become exponentially harder
						when they have to go head to head with the all-new threat to playtime."
					</p>
					<div className="action-buttons">
						<button>Watch now </button>
						<button>Add to list</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
