import Link from "next/link";
import { Mail, Github } from "lucide-react";
import BasicHeader from "@/components/basic-header";
import { FiGithub } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export const metadata = {
	title: "Ham+Hum — Contact",
};

export default function ContactPage() {
	return (
		<div className="max-w-180 w-full mx-auto px-5 flex flex-col gap-10 py-10 mt-10 text-foreground">
			<BasicHeader
				sticker="Get in Touch"
				title="Let's talk"
				description="Questions, bug reports, or just want to say the film-grain effect is too much? Reach out below — Ham+Hum is a small demo project, so expect a real (if not instant) reply from an actual person."
				footer="We typically reply within a few days"
			/>

			<section className="grid gap-10">
				<section>
					<form className="flex flex-col gap-4">
						<div className="grid sm:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs font-medium text-muted-foreground mb-1.5">
									Name
								</label>
								<input
									type="text"
									placeholder="Jane Dela Cruz"
									className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-muted-foreground mb-1.5">
									Email
								</label>
								<input
									type="email"
									placeholder="you@example.com"
									className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-medium text-muted-foreground mb-1.5">
								Reason
							</label>
							<select className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition">
								<option>General question</option>
								<option>Bug report</option>
								<option>Feedback</option>
								<option>Something else</option>
							</select>
						</div>

						<div>
							<label className="block text-xs font-medium text-muted-foreground mb-1.5">
								Message
							</label>
							<textarea
								rows={5}
								placeholder="What's up?"
								className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition resize-none"
							/>
						</div>

						<Button
							type="submit"
							className="primary-btn self-start mt-1 px-6 mx-auto py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
						>
							Send message
						</Button>
					</form>
				</section>
				<span className="border-b border-muted-foreground/30" />
				<section>
					{/* <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70 mb-3.5">
						Direct Contact
					</p> */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
						<Link
							href="mailto:hamhum.plus2026@gmail.com"
							className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary/40 transition"
						>
							<span className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground shrink-0">
								<Mail className="w-4 h-4" />
							</span>
							<div className="min-w-0">
								<p className="text-sm font-medium">Email</p>
								<p className="text-xs text-muted-foreground truncate">
									hamhum.plus2026@gmail.com
								</p>
							</div>
						</Link>

						<Link
							href="https://github.com/humbledog30"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary/40 transition"
						>
							<span className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground shrink-0">
								<FiGithub className="w-4 h-4" />
							</span>
							<div className="min-w-0">
								<p className="text-sm font-medium">GitHub</p>
								<p className="text-xs text-muted-foreground truncate">
									Report a bug or view the source
								</p>
							</div>
						</Link>
					</div>

					<p className="text-xs text-muted-foreground/70 leading-relaxed pt-4">
						Copyright or DMCA concern?{" "}
						<Link href="/copyright" className="underline hover:text-primary transition">
							Use our dedicated process
						</Link>{" "}
						instead — it collects what's legally required and gets routed faster.
					</p>
				</section>
			</section>

			<section className="p-6 flex flex-col gap-2 border rounded-xl bg-border/40 text-center mt-5">
				<p className="text-primary text-pretty">
					Hamhum+ is a non-commercial demo project. Response times aren&apos;t guaranteed.
				</p>
			</section>
		</div>
	);
}
