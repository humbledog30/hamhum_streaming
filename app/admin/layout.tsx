import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarFooterUser from "@/components/sidebar-footer-user";

import AdminBreadcrumbs from "@/components/admin-breadcrumbs";
import { Suspense } from "react";
import AppSidebarSkeleton from "./components/app-sidebar-skeleton";
import AdminBreadcrumbsSkeleton from "./components/admin-breadcrumb-skeleton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="min-h-screen flex flex-col items-center">
			<TooltipProvider>
				<SidebarProvider
					style={
						{
							"--sidebar-width": "19rem",
						} as React.CSSProperties
					}
				>
					<Suspense fallback={<AppSidebarSkeleton />}>
						<AppSidebar footer={<SidebarFooterUser />} />
					</Suspense>
					<SidebarInset>
						<Suspense fallback={<AdminBreadcrumbsSkeleton />}>
							<AdminBreadcrumbs />
						</Suspense>
						<section>{children}</section>
					</SidebarInset>
				</SidebarProvider>
			</TooltipProvider>
		</main>
	);
}
