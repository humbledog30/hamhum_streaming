import Link from "next/link";

const BrandLogo = ({}) => {
	return (
		<Link className="flex text-3xl font-fraunces" href={"/"}>
			<img
				className="h-8 w-auto hidden dark:block"
				src="/Dark-Mode.png"
				alt="Brand Logo Dark"
			/>
			<img
				className="h-8 w-auto block dark:hidden"
				src="/Light-Mode.png"
				alt="Brand Logo Light"
			/>
		</Link>
	);
};

export default BrandLogo;
