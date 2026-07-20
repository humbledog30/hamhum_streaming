import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/actions/auth.action";

export const useLogin = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	return useMutation({
		mutationFn: login,
		onSuccess: (result) => {
			if (!result.success) return;

			const redirectTo = searchParams.get("redirect");
			const safeRedirect =
				redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
					? redirectTo
					: "/";

			router.push(safeRedirect);
			router.refresh();
		},
	});
};
