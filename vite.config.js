import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		proxy: {
		  // Using the '/api' prefix as an example
		  '/api': {
			target: 'http://192.168.0.10',
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/api/, '')
		  }
		}
	  }
});
