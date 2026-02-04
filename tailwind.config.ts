import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#6C5CE7",
					light: "#7B61FF",
					dark: "#5A4BDA",
				},

				gradient: {
					primaryStart: "#7B61FF",
					primaryEnd: "#5A4BDA",
				},

				accent: {
					indigoSoft: "#8B80F9",
					lavenderLight: "#E9E6FF",
					blueTint: "#F4F6FF",
				},

				ui: {
					bg: "#F8F9FC",
					card: "#FFFFFF",
					border: "#ECEEF5",
					divider: "#E2E6F3",
				},

				text: {
					primary: "#1A1D2E",
					secondary: "#6B7280",
					muted: "#9AA3B2",
				},

				status: {
					success: "#22C55E",
					warning: "#F59E0B",
					error: "#EF4444",
					info: "#3B82F6",
				},
			},
		},
	},
	plugins: [],
};
export default config;
