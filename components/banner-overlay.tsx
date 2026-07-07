const BannerOverlay = ({}) => {
	return (
		<>
			<div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--primary)/0.18),transparent_55%)]" />
			<div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,hsl(var(--background)/0.05)_0%,hsl(var(--background)/0.55)_58%,hsl(var(--background)/1)_100%)]" />
			<div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,hsl(var(--background)/0.75)_0%,hsl(var(--background)/0.15)_45%,hsl(var(--background)/0.05)_70%)]" />
		</>
	);
};

export default BannerOverlay;
