import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "../env-var-warning";
import { Suspense } from "react";
import { AuthButton } from "../auth-button";
import BrandLogo from "../brand-logo";
import MobileMenu from "./mobile-menu";
import SearchPopover from "../search-popover";
import Menus from "../menus";

const MainNavigation = ({}) => {
	return (
		<nav className="w-full fixed z-50 bg-background flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full section-container gap-3 flex justify-between items-center py-3">
				<div className="flex gap-5 items-center font-semibold">
					<BrandLogo />
				</div>

				<Menus />

				<div className="flex gap-2 items-center">
					<SearchPopover />
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
