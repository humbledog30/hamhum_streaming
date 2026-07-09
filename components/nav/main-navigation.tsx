import { hasEnvVars } from "@/lib/utils";
import { NextPage } from "next";
import { EnvVarWarning } from "../env-var-warning";
import { Suspense } from "react";
import { AuthButton } from "../auth-button";
import BrandLogo from "../brand-logo";
import Link from "next/link";
import { Bookmark, LayoutGrid, Search } from "lucide-react";
import { Button } from "../ui/button";

interface Props {}

const MainNavigation: NextPage<Props> = ({}) => {
	return (
		<nav className="w-full fixed z-50 bg-background flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full section-container flex justify-between items-center py-3">
				<div className="flex gap-5 items-center font-semibold">
					<BrandLogo />
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
				</div>
			</div>
		</nav>
	);
};

export default MainNavigation;
