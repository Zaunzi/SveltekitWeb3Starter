import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		// Resolve node-fetch and similar from node_modules (avoids "failed to locate dependencies" warning)
		noExternal: ['node-fetch']
	}
});
