import { Get, Post } from "ovr";

export const products = new Get("/", () => {
	return (
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
