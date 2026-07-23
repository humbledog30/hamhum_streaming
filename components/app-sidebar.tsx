"use client";

import {
	BarChart3,
	BookOpen,
	Bot,
	Command,
	Frame,
	Layout,
	LayoutDashboardIcon,
	LifeBuoy,
	LucideLayoutGrid,
	Map,
	PieChart,
	Send,
	Settings2,
	SquareTerminal,
	Tv2,
	User2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import BrandLogo from "./brand-logo";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";

export const menuData = [
	{
		title: "Overview",
		menu: [
			{
				title: "Dashboard",
				url: "/admin/dashboard",
				icon: LayoutDashboardIcon,
				isActive: true,
			},
			{
				title: "Analytics",
				url: "/admin/analytics",
				icon: BarChart3,
				isActive: false,
			},
		],
	},
	{
		title: "Content",
		menu: [
			{
				title: "Titles",
				url: "/admin/titles",
				icon: Layout,
				isActive: false,
			},
			{
				title: "Cast & Crew",
				url: "/admin/cast-and-crew",
				icon: User2,
				isActive: false,
			},
			{
				title: "Genres",
				url: "/admin/genres",
				icon: LucideLayoutGrid,
				isActive: false,
			},
			{
				title: "Curation",
				url: "/admin/curation",
				icon: Tv2,
				isActive: false,
			},
		],
	},
];

export function AppSidebar({
	footer,
	...props
}: React.ComponentProps<typeof Sidebar> & { footer?: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<BrandLogo />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{menuData?.map((menuItem: (typeof menuData)[0]) => {
					const menu = menuItem.menu.map((item) => {
						const url = item.url.toLowerCase();
						const path = pathname.toLowerCase();
						return {
							...item,
							isActive: path === url || path.startsWith(url + "/"),
						};
					});

					return <NavMain key={menuItem.title} menuTitle={menuItem.title} items={menu} />;
				})}
				{/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
			</SidebarContent>
			<Suspense>{footer}</Suspense>
		</Sidebar>
	);
}
