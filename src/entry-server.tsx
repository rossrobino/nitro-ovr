import { App } from "ovr";
import * as products from "./products";
import assets from "./entry-client.ts?assets=client";

const app = new App();

app.use((c, next) => {
	c.head(
		<>
			<link rel="icon" type="image/svg+xml" href="/nitro.svg" />
			<script type="module" src={assets.entry} />
			{assets.css.map((attr) => (
				<link rel="stylesheet" href={attr.href} />
			))}
			{/* import.meta.dev seems to be undefined always - to avoid FOUC in dev */}
			{(import.meta.dev || true) && (
				<link rel="stylesheet" href="/src/style.css" />
			)}
		</>,
	);

	return next();
});

app.add(products);

export default app;
