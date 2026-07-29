"use client";
import { useSelectedLayoutSegments } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const Breadcrumbs = ({}) => {
	const segments = useSelectedLayoutSegments();
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<p>Home</p>
				</BreadcrumbItem>
				{segments.map((item, index) => {
					const isLast = index === segments.length - 1;
					const href = "/" + segments.slice(0, index + 1).join("/");
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
	);
};

export default Breadcrumbs;
