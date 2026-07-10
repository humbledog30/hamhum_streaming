import BasicHeader from "@/components/basic-header";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export default function Page() {
	return (
		<div className="max-w-180 w-full mx-auto px-5 flex flex-col gap-10 py-10 mt-10 text-foreground">
			<BasicHeader
				sticker="Account Recovery"
				title="Forgot your password?"
				description="No worries — enter the email on your account and we'll send a link to get you back in."
			/>

			<section className="grid grid-cols-1">
				<ForgotPasswordForm />
			</section>
		</div>
	);
}
