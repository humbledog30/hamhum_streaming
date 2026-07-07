import Link from "next/link";

const BrandLogo = ({}) => {
	return (
		<Link className="flex text-3xl font-fraunces" href={"/"}>
			Ham
			<span className="text-primary font-extrabold text-2xl -mt-2 -ml-1 block">+</span>
			Hum
		</Link>
	);
};

export default BrandLogo;
