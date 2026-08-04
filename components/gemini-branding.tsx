import { cn, defaultUrl } from "@/lib/utils";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaAlgolia } from "react-icons/fa";

const GeminiBranding = ({ className }: { className?: string }) => {
	return (
		<Link
			href={`https://ai.google.dev/gemini-api/docs?utm_source=${defaultUrl}&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch`}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors",
				className,
			)}
		>
			<span>Powered by</span>
			<div className="relative aspect-square w-auto h-3">
				<Image
					alt="Gemini AI"
					fill
					sizes="w-10"
					className="dark:saturate-80"
					src="/gemini-icon.png"
				/>
			</div>
			<span>Gemini</span>
		</Link>
	);
};

export default GeminiBranding;
