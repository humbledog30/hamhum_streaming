import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function CatchAll() {
	return (
		<div className="section-container flex-1 mx-auto py-20 mt-16 flex justify-center items-center flex-col text-foreground gap-4">
			<h1 className="font-fraunces text-6xl lg:text-8xl font-semibold ">
				4<span className="text-primary font-inter ">0</span>4
			</h1>
			<p className=" text-2xl md:text-4xl font-semibold">Page not found.</p>
			<p className="max-w-125 w-full text-center text-muted-foreground text-pretty">
				The page you're looking for doesn't exist, was moved, or never made it past the
				pitch. Let's get you back to something worth watching.
			</p>
			<div className="flex flex-wrap justify-center gap-3 mt-4">
				<Link
					href={"/admin/dashboard"}
					className="bg flex gap-2 items-center primary-btn btn h-full border p-1.5 px-4"
				>
					<LayoutDashboard size={17} /> Go to Dashboard
				</Link>
			</div>
		</div>
	);
}
