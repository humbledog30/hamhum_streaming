"use client";
import { NextPage } from "next";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { menuData } from "./app-sidebar";
import React from "react";

const AdminBreadcrumbs = ({}) => {
	const pathname = usePathname();

	const activeMenu = menuData
		.map((menuItem) => {
			const menu = menuItem.menu.find(
				(item) => item.url.toLowerCase() === pathname.toString(),
			);
			return menu ? { parentRoute: menuItem.title ?? "", menu } : null;
		})
		.find((item) => item !== null);
	const breadcrumbItems = pathname.split("/").slice(2);
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 px-6 fixed top-0 z-40 bg-background w-full">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className="hidden md:block">
						<p>{activeMenu?.parentRoute ?? "Admin"}</p>
					</BreadcrumbItem>

					{breadcrumbItems.map((item) => {
						return (
							<React.Fragment key={item}>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage className="capitalize">
										{item.split("-").join(" ")}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</React.Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
};

export default AdminBreadcrumbs;
