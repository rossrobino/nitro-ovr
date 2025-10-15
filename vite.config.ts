import { defineConfig, type Plugin, type ViteBuilder } from "vite";
import { nitro } from "nitro/vite";
import { assetsPlugin } from "@hiogawa/vite-plugin-fullstack";

export default defineConfig({
	plugins: [patchAssets(assetsPlugin()), nitro()],
	nitro: {
		preset: "standard",
	},
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

function patchAssets(plugin: Plugin[]) {
	const assetsPlugin = plugin.find((p) => p.name === "fullstack:assets")!;

	const { handler } = assetsPlugin.buildApp as {
		handler: (builder: ViteBuilder) => any;
	};

	assetsPlugin.buildApp = async (builder) => {
		await builder.build(builder.environments.client);
		await builder.build(builder.environments.ssr);
		await handler(builder);
	};

	return plugin;
}
