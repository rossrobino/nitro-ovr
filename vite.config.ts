import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
	plugins: [
		nitro({
			experimental: { vite: { assetsImport: true, serverReload: true } },
			preset: "vercel",
		}),
	],
	environments: {
		client: {
			build: {
				rollupOptions: { input: "./src/entry-client.ts" },
			},
		},
		ssr: {
			build: {
				rollupOptions: { input: "./src/entry-server.tsx" },
				outDir: ".nitro/vite/services/ssr",
			},
		},
	},
});
