import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./public/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: "#3490dc",
				secondary: "#ffed4a",
			},
		},
	},
	plugins: [],
};

export default config;
