import { ChevronRight, Info } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
	value: string;
	question: string;
	answer: string;
}
interface FaqDataProps {
	sectionTitle: string;
	items: FaqItem[];
}
export const faqData = [
	{
		sectionTitle: "Account",
		items: [
			{
				value: "item-1",
				question: "How do I create a profile?",
				answer: "During onboarding, pick an avatar and choose a display name — that becomes your profile. You can create more from Account Settings once you're signed in.",
			},
			{
				value: "item-2",
				question: "How do I change my display name or avatar?",
				answer: "Open the profile menu in the top right and select Account Settings. Changes save instantly and apply the next time you switch profiles.",
			},
			{
				value: "item-3",
				question: "How do I switch between profiles?",
				answer: "Click your avatar in the top right, then choose Switch Profile from the menu.",
			},
		],
	},
	{
		sectionTitle: "Playback",
		items: [
			{
				value: "item-4",
				question: "Why won't a title play?",
				answer: "Try refreshing the page or checking your connection first. If a title still won't load, it may be a demo listing without a playable source.",
			},
			{
				value: "item-5",
				question: "What devices are supported?",
				answer: "Hamhum+ runs in any modern browser on desktop, tablet, or mobile — no separate app required.",
			},
			{
				value: "item-6",
				question: "Can I download titles to watch offline?",
				answer: "Not currently — Hamhum+ is a browsing and discovery experience rather than a video host.",
			},
		],
	},
	{
		sectionTitle: "General",
		items: [
			{
				value: "item-7",
				question: "How are recommendations chosen?",
				answer: "Based on the genres you pick during onboarding and the titles you interact with — the more you use Hamhum+, the more tailored your rows become.",
			},
			{
				value: "item-8",
				question: "Is Hamhum+ free to use?",
				answer: "Yes. Hamhum+ is a demonstration project and is not for commercial use.",
			},
			{
				value: "item-9",
				question: "Where does your content data come from?",
				answer: "Titles, artwork, and metadata are sourced via the TMDB API. Hamhum+ uses the TMDB API but is not endorsed or certified by TMDB — see our Copyright & DMCA page for the full notice.",
			},
		],
	},
];

const HelpCenterPage = ({}) => {
	return (
		<div className="w-full max-w-180  mx-auto py-10 mt-10 text-foreground relative">
			<div className="text-center">
				<div className="absolute -top-32 left-1/2 -translate-x-1/2 w-130 h-80 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)]" />
				<p className="relative z-10 uppercase font-bold text-primary mb-6  tracking-wider">
					Help Center
				</p>
				<h1 className="relative z-10 font-fraunces text-4xl md:text-5xl font-semibold mb-3">
					How can we help?
				</h1>
				<p className="relative z-10 text-muted-foreground mx-auto w-full max-w-100 text-pretty">
					Answers to the most common questions about your account, playback, and how
					Hamhum+ works.
				</p>
			</div>

			<div className="flex gap-2 mt-10 p-5 border rounded-xl bg-border/40 w-full mx-auto">
				<Info className="text-primary/80 size-8 -translate-y-1" />
				<p>
					For the smoothest experience,{" "}
					<span className="text-primary/70">we recommend browsing Hamhum+ with the</span>{" "}
					Brave browser <span className="text-primary/70">or an ad blocker enabled.</span>{" "}
					<span className="text-muted-foreground text-sm">
						Totally optional — everything works fine without it.
					</span>
				</p>
			</div>
			<div>
				{faqData.map((section: FaqDataProps) => (
					<div key={section.sectionTitle}>
						<h6>{section.sectionTitle}</h6>

						<Accordion type="single" collapsible>
							{section.items.map((item) => (
								<AccordionItem key={item.value} value={item.value}>
									<AccordionTrigger>{item.question}</AccordionTrigger>
									<AccordionContent>{item.answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				))}
			</div>
			<section className="p-6 flex flex-col gap-2 border rounded-xl bg-border/40 text-center">
				<p className="text-2xl font-fraunces font-semibold ">Still stuck?</p>
				<p className="text-primary">
					Can't find what you're looking for — send us a note and we'll get back to you.
				</p>
				<Link
					href="mailto:hamhum.plus2026@gmail.com"
					className=" bg-primary w-fit mx-auto items-center rounded-lg mt-3 flex gap-2 p-2 px-6 hover:decoration-primary transition"
				>
					Contact Us
					<ChevronRight size={18} />
				</Link>
			</section>
		</div>
	);
};

export default HelpCenterPage;
