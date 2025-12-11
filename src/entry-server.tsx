import { App } from "ovr";
import * as products from "./products";

const app = new App();

app.use(products);

export default app;
