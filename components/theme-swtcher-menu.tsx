"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const ThemeSwitcherMenu = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const isDark = theme === "dark";

	return (
		<DropdownMenuItem
			onSelect={(e) => {
				e.preventDefault();
			}}
			className="cursor-pointer flex"
		>
			{isDark ? <Moon /> : <Sun />}
			<Label htmlFor="appearance" className="cursor-pointer flex-1">
				Appearance
			</Label>
			<Switch
				checked={isDark}
				id="appearance"
				className="cursor-pointer ml-auto"
				onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
			/>
		</DropdownMenuItem>
	);
};

export { ThemeSwitcherMenu };
