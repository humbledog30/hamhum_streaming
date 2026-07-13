"use client";

import { toast } from "sonner";
import { Check, X, AlertTriangle, Info, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "default" | "success" | "error" | "warning" | "info" | "loading";

type ToastOpts = {
	description?: string;
	action?: { label: string; onClick: () => void };
	duration?: number;
};

// single source of truth for the default toast duration —
// also passed to <Toaster duration={...} /> so the two stay in sync
export const DEFAULT_TOAST_DURATION = 3000;

const ICON: Record<Variant, ReactNode> = {
	default: <span className="block h-2 w-2 rounded-full bg-[hsl(var(--toast-neutral))]" />,
	success: <Check className="h-4 w-4 text-[hsl(var(--toast-success))]" strokeWidth={2.5} />,
	error: <X className="h-4 w-4 text-[hsl(var(--toast-error))]" strokeWidth={2.5} />,
	warning: <AlertTriangle className="h-4 w-4 text-[hsl(var(--toast-warning))]" strokeWidth={2} />,
	info: <Info className="h-4 w-4 text-[hsl(var(--toast-info))]" strokeWidth={2} />,
	loading: (
		<Loader2
			className="h-4 w-4 animate-spin text-[hsl(var(--toast-neutral))]"
			strokeWidth={2}
		/>
	),
};

const TINT: Record<Variant, string> = {
	default: "bg-[hsl(var(--toast-neutral-tint))]",
	success: "bg-[hsl(var(--toast-success-tint))]",
	error: "bg-[hsl(var(--toast-error-tint))]",
	warning: "bg-[hsl(var(--toast-warning-tint))]",
	info: "bg-[hsl(var(--toast-info-tint))]",
	loading: "bg-[hsl(var(--toast-neutral-tint))]",
};

// progress-bar color per variant — kept separate from TINT since the bar
// needs the solid accent, not the soft icon-circle background
const BAR: Record<Variant, string> = {
	default: "bg-[hsl(var(--toast-neutral))]",
	success: "bg-[hsl(var(--toast-success))]",
	error: "bg-[hsl(var(--toast-error))]",
	warning: "bg-[hsl(var(--toast-warning))]",
	info: "bg-[hsl(var(--toast-info))]",
	loading: "bg-[hsl(var(--toast-neutral))]",
};

function ToastCard({
	id,
	variant,
	title,
	description,
	action,
	duration,
}: {
	id: string | number;
	variant: Variant;
	title: string;
	description?: string;
	action?: { label: string; onClick: () => void };
	duration: number;
}) {
	// loading toasts pass Infinity — there's no countdown to show until they resolve
	const showBar = Number.isFinite(duration);

	return (
		<div className="relative flex w-96 items-center gap-3 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-lg shadow-black/20">
			<div
				className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${TINT[variant]}`}
			>
				{ICON[variant]}
			</div>

			<div className="min-w-0 flex-1 pt-px">
				<p className="text-base font-semibold leading-tight text-card-foreground">
					{title}
				</p>
				{description && (
					<p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
				)}
				{action && (
					<div className="mt-2">
						<button
							onClick={() => {
								action.onClick();
								toast.dismiss(id);
							}}
							className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
						>
							{action.label}
						</button>
					</div>
				)}
			</div>

			<button
				onClick={() => toast.dismiss(id)}
				className="shrink-0 self-start rounded-full p-1 text-muted-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
				aria-label="Dismiss"
			>
				<X className="h-3 w-3" strokeWidth={2} />
			</button>

			{showBar && (
				<div
					key={id}
					className={`absolute inset-x-0 bottom-0 h-[2px] origin-left ${BAR[variant]}`}
					style={{ animation: `toast-shrink ${duration}ms linear forwards` }}
				/>
			)}
		</div>
	);
}

function show(variant: Variant, title: string, opts?: ToastOpts) {
	const duration = opts?.duration ?? DEFAULT_TOAST_DURATION;
	return toast.custom(
		(id) => (
			<ToastCard
				id={id}
				variant={variant}
				title={title}
				description={opts?.description}
				action={opts?.action}
				duration={duration}
			/>
		),
		{ duration },
	);
}

export const appToast = {
	message: (title: string, opts?: ToastOpts) => show("default", title, opts),
	success: (title: string, opts?: ToastOpts) => show("success", title, opts),
	error: (title: string, opts?: ToastOpts) => show("error", title, opts),
	warning: (title: string, opts?: ToastOpts) => show("warning", title, opts),
	info: (title: string, opts?: ToastOpts) => show("info", title, opts),
	loading: (title: string, opts?: ToastOpts) =>
		show("loading", title, { duration: Infinity, ...opts }),
	dismiss: (id: string | number) => toast.dismiss(id),
};

export function appToastPromise<T>(
	promise: Promise<T>,
	messages: { loading: string; success: string; error: string },
) {
	const id = appToast.loading(messages.loading);
	promise
		.then(() => {
			toast.dismiss(id);
			appToast.success(messages.success);
		})
		.catch(() => {
			toast.dismiss(id);
			appToast.error(messages.error);
		});
	return promise;
}
