import { hasEnvVars } from "@/lib/utils";
import { NextPage } from "next";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { EnvVarWarning } from "../env-var-warning";
import { Suspense } from "react";
import { AuthButton } from "../auth-button";
import BrandLogo from "../brand-logo";

interface Props {}

const MainNavigation: NextPage<Props> = ({}) => {
	return (
		<nav className="w-full fixed z-50 bg-background flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full section-container flex justify-between items-center py-3">
				<div className="flex gap-5 items-center font-semibold">
					<BrandLogo />
				</div>
				{!hasEnvVars ? (
					<EnvVarWarning />
				) : (
					<Suspense>
						<AuthButton />
					</Suspense>
				)}
			</div>
		</nav>
	);
};

export default MainNavigation;
