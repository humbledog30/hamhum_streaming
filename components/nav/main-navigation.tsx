import { hasEnvVars } from "@/lib/utils";
import { NextPage } from "next";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { EnvVarWarning } from "../env-var-warning";
import { Suspense } from "react";
import { AuthButton } from "../auth-button";

interface Props {}

const MainNavigation: NextPage<Props> = ({}) => {
	return (
		<nav className="w-full fixed z-50 bg-background flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full container flex justify-between items-center p-3 px-5">
				<div className="flex gap-5 items-center font-semibold">
					<Link className="flex text-3xl font-fraunces" href={"/"}>
						Ham
						<span className="text-primary font-extrabold text-2xl -mt-2 -ml-1 block">
							+
						</span>
						Hum
					</Link>
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
