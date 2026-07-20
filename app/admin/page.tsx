import BrandLogo from "@/components/brand-logo";
import { ChevronRight } from "lucide-react";
import WelcomeAdmin from "./components/welcome-admin";
import { Suspense } from "react";

interface Props {}

const Page = ({}) => {
	return (
		<div className="h-full max-w-125 w-full mx-auto text-center gap-5 flex justify-center items-center flex-col px-5 py-15 rleative">
			<div className="absolute -top-32 left-1/2 -translate-x-1/2 w-200 max-w-full h-140 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)]" />
			<BrandLogo />
			<p className="uppercase text-muted-foreground mt-5 tracking-widest text-xs font-semibold">
				Admin console
			</p>
			<Suspense>
				<WelcomeAdmin />
			</Suspense>
			<p className="text-muted-foreground">
				Everything you need to manage the catalog, users, and collections is one click away.
			</p>
			<a
				className="primary-btn mt-5 flex gap-1 items-center px-4 py-2 rounded-md"
				href="/admin/dashboard"
			>
				Go to Dashboard <ChevronRight />
			</a>
		</div>
	);
};

export default Page;
