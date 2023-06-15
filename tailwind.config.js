/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pokemon: ["pokemon"],
			},
			colors: {
				pokemonYellow: "#fecd30",
				pokemonBlue: "#2c2b9a",
			},
			keyframes: {
				scaleX: {
					"0%": { scale: "0 100%" },
					"100%": { scaleX: "100% 100%" },
				},
				blink: {
					"100%": { backgroundColor: "#fecd30" },
				},
				float: {
					"0%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(4px)" },
					"10%": { transform: "translateY(0px)" },
				},
			},
			animation: {
				scaleX: "scaleX 1s ease-out",
				blink: "blink 1s ease-out infinite var(--delay)",
				float: "float 1.5s ease-out infinite alternate-reverse",
				spinOnce: "spin 1s ease-out",
				pingOnce: "ping 1s ease-out",
				pulseDelay: "pulse 1s ease-out var(--delay) infinite",
			},
		},
	},
	plugins: [],
};
