import { Get, Post } from "ovr";
import assets from "./entry-client?assets";

export const products = new Get("/", () => {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>ovr + Nitro</title>
				<link rel="icon" type="image/svg+xml" href="/nitro.svg" />
				<script type="module" src={assets.entry} />
				{/* @ts-ignore - import.meta.dev seems to be undefined always - to avoid FOUC in dev */}
				{import.meta.env.DEV && <link rel="stylesheet" href="/src/style.css" />}
				{assets.css.map((attr) => (
					<link rel="stylesheet" href={attr.href} />
				))}
			</head>
			<body>
				<main>
					<section class="prose">
						<h1>Store</h1>
						<p>
							This is a mock storefront built with{" "}
							<a href="https://v3.nitro.dev">Nitro</a> +{" "}
							<a href="https://ovr.robino.dev">ovr</a>.
						</p>
						<p>
							<products.Anchor>Refresh</products.Anchor>
						</p>
					</section>

					<section>
						<form>
							<Products />
						</form>
					</section>
				</main>
			</body>
		</html>
	);
});

export const buy = new Post("/buy/:id", async (c) => {
	await delay();

	c.redirect(success.pathname(c.params), 303);
});

export const success = new Get("/product/:id", (c) => (
	<main>
		<section class="prose">
			<h1>Thank you!</h1>
			<p>Product {c.params.id} is on its way!</p>
		</section>
	</main>
));

const Products = () => (
	<ul class="products">
		{Array.from({ length: 100 }).map((_, i) => {
			return (
				<li>
					<Product id={i + 1} />
				</li>
			);
		})}
	</ul>
);

const Product = async (props: { id: number }) => {
	await delay();

	return (
		<div class="product">
			<h3>Product {props.id}</h3>
			<buy.Button class="secondary" params={{ id: String(props.id) }}>
				Buy
			</buy.Button>
		</div>
	);
};

const delay = () => new Promise((r) => setTimeout(r, 1000 * Math.random()));
