import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaAlgolia } from "react-icons/fa";

const AlgoliaBranding = ({}) => {
	return (
		<Link
			href="https://www.algolia.com/ref/docsearch/?utm_source=yoursite&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch"
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
		>
			Search by
			<div className="relative aspect-800/182 w-auto h-3">
				<Image
					alt="Algolia"
					fill
					sizes="100px"
					className="dark:saturate-80"
					src="/algolia.png"
				/>
			</div>
		</Link>
	);
};

export default AlgoliaBranding;
