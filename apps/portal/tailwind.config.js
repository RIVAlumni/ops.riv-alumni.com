/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*{html,ts,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist Sans', 'sans-serif'],
				mono: ['Geist Mono', 'monospace']
			}
		}
	},
	plugins: []
};
