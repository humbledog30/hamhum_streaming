import { hasEnvVars } from "@/lib/utils";
import { NextPage } from "next";
import { EnvVarWarning } from "../env-var-warning";
import { Suspense } from "react";
import { AuthButton } from "../auth-button";
import BrandLogo from "../brand-logo";
import Link from "next/link";
import { Bookmark, LayoutGrid, Search } from "lucide-react";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";

interface Props {}

const MainNavigation: NextPage<Props> = ({}) => {
	return (
		<nav className="w-full fixed z-50 bg-background flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full section-container gap-3 flex justify-between items-center py-3">
				<div className="flex gap-5 items-center font-semibold">
					<BrandLogo />
				</div>
				<div className="gap-4 mr-auto ml-5 hidden lg:flex [&>a]:hover:text-primary [&>a]:transition-all [&>a]:duration-200">
					<Link href={"#"}>Browse</Link>
					<Link href={"#"}>Popular Movies</Link>
					<Link href={"#"}>Upcoming Releases</Link>
					<Link href={"#"}>All Time Great</Link>
				</div>

				<div className="flex gap-2 items-center">
					<Button asChild size="sm" className="rounded-full p-2" variant={"outline"}>
						<Link href="#">
							<Search />
						</Link>
					</Button>
					{!hasEnvVars ? (
						<EnvVarWarning />
					) : (
						<Suspense>
							<AuthButton />
						</Suspense>
					)}
					<MobileMenu />
				</div>
			</div>
		</nav>
	);
};

export default MainNavigation;
