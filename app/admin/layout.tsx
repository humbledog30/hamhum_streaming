import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarFooterUser from "@/components/sidebar-footer-user";

import AdminBreadcrumbs from "@/components/admin-breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("http://localhost:3000/admin/dashboard"),
	title: "Ham+Hum | Admin",
};

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
					<AppSidebar footer={<SidebarFooterUser />} />
					<SidebarInset className="m-0!">
						<AdminBreadcrumbs />
						<section className="flex-1">{children}</section>
					</SidebarInset>
				</SidebarProvider>
			</TooltipProvider>
		</main>
	);
}
