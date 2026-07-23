"use client";
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
			const menu = menuItem.menu.find((item) => {
				const itemUrl = item.url.toLowerCase();
				const currentPath = pathname.toString().toLowerCase();
				return currentPath === itemUrl || currentPath.startsWith(itemUrl + "/");
			});
			return menu ? { parentRoute: menuItem.title ?? "", menu } : null;
		})
		.find((item) => item !== null);

	const pathSegments = pathname.split("/");
	const basePath = pathSegments.slice(0, 2).join("/");
	const breadcrumbItems = pathSegments.slice(2);

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 px-6 fixed top-0 z-40 bg-background w-full">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className="hidden md:block">
						<p>{activeMenu?.parentRoute ?? "Admin"}</p>
					</BreadcrumbItem>

					{breadcrumbItems.map((item, index) => {
						const isLast = index === breadcrumbItems.length - 1;
						const href = basePath + "/" + breadcrumbItems.slice(0, index + 1).join("/");

						return (
							<React.Fragment key={item}>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage className="capitalize">
											{item.split("-").join(" ")}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink href={href} className="capitalize">
											{item.split("-").join(" ")}
										</BreadcrumbLink>
									)}
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
